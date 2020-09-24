import { useReducer, useCallback } from 'react';
import {
  isEnPassant,
  handleGetNewPositions,
  handleResetAndGetNewPositions,
  handleEnPassantCapture,
  handleCastlingMove,
  handleNormalMove,
  handleCapture,
  handleDisableBlocks,
  handleEnableBlocks,
  deletePieceFromBoard,
  addPieceToBoard,
  validateStatus,
} from '../utils';
import { PieceType, UpdateModeType } from '../constants';

const BoardActionType = {
  GET_NEW_POSITIONS: 'GET_NEW_POSITIONS',
  RESET_AND_GET_NEW_POSITIONS: 'RESET_AND_GET_NEW_POSITIONS',
  NORMAL_MOVES: 'NORMAL_MOVES',
  CASTLING_MOVES: 'CASTLING_MOVES',
  NORMAL_CAPTURE: 'NORMAL_CAPTURE',
  EN_PASSANT_CAPTURE: 'EN_PASSANT_CAPTURE',
  PROMOTION: 'PROMOTION',
  UPDATE_BOARD: 'UPDATE_BOARD',
  // Add/Delete piece in block
  ADD_PIECE: 'ADD_PIECE',
  ADD_PIECE_CONFIRM: 'ADD_PIECE_CONFIRM',
  DELETE_PIECE: 'DELETE_PIECE',
  DELETE_PIECE_CONFIRM: 'DELETE_PIECE_CONFIRM',
  TOGGLE_UPDATE_MODE: 'TOGGLE_UPDATE_MODE',
  CLOSE_UPDATE_MODE_POPUP: 'CLOSE_UPDATE_MODE_POPUP',
  // Check valid status after n moves
  VALIDATE_STATUS: 'VALIDATE_STATUS',
  TRY_AGAIN: 'TRY_AGAIN',
  NEXT_MOVE: 'NEXT_MOVE',
};

export const useBoard = (state) => {
  const [boardState, dispatch] = useReducer(boardReducer, state);

  // Main funcs are bellow
  const handleUpdateBoard = useCallback((newBoard) => {
    dispatch({
      type: BoardActionType.UPDATE_BOARD,
      newBoard,
    });
  }, []);

  const handlePromotionClick = useCallback((type, state) => {
    const { promotionForPawn, board } = state;
    const newBoard = [...board];
    newBoard[promotionForPawn.piece.index].piece.type = type;
    dispatch({
      type: BoardActionType.PROMOTION,
      newBoard,
    });
  }, []);

  const handleClick = useCallback((block, state) => {
    const { currentBlock, board, isCastlingMove } = state;
    if (!currentBlock) {
      dispatch({
        type: BoardActionType.GET_NEW_POSITIONS,
        block,
      });
    } else {
      // Incase user click again in that block
      if (
        currentBlock.position[0] === block.position[0] &&
        currentBlock.position[1] === block.position[1]
      ) {
        return;
      }
      // Incase user click another blocks(not move or capture) we need:
      // Reset previous available positions and reset highlight
      // Get new available position for that block
      // Otherwise we need to handle capture and moves
      if (block.piece && block.piece.isWhite === currentBlock.piece.isWhite) {
        if (block.piece.type === PieceType.ROOK && isCastlingMove) {
          dispatch({
            type: BoardActionType.CASTLING_MOVES,
            block,
          });
        } else {
          dispatch({
            type: BoardActionType.RESET_AND_GET_NEW_POSITIONS,
            block,
          });
        }
      } else {
        if (!block.piece) {
          const [x, y] = block.position;
          const { isWhite, isWhiteNext } = state;
          const enX = isWhiteNext ? x + 1 : x - 1;
          if (isEnPassant(board, [enX, y], isWhite)) {
            dispatch({
              type: BoardActionType.EN_PASSANT_CAPTURE,
              block,
            });
          } else {
            dispatch({
              type: BoardActionType.NORMAL_MOVES,
              block,
            });
          }
        } else {
          dispatch({
            type: BoardActionType.NORMAL_CAPTURE,
            block,
          });
        }
      }
    }
  }, []);

  // Update mode funcs are bellow
  const handleToggleUpdateMode = () => {
    dispatch({
      type: BoardActionType.TOGGLE_UPDATE_MODE,
    });
  };

  const handleCloseUpdateModePopup = () => {
    dispatch({
      type: BoardActionType.CLOSE_UPDATE_MODE_POPUP,
    });
  };

  const handleActionModeClick = (mode, block) => {
    switch (mode) {
      case UpdateModeType.ADD:
        dispatch({
          type: BoardActionType.ADD_PIECE,
          block,
          updateMode: mode,
        });
        break;
      case UpdateModeType.DELETE:
        dispatch({
          type: BoardActionType.DELETE_PIECE,
          updateMode: mode,
          block,
        });
        break;
      default:
        break;
    }
  };

  const handleDeletePiece = useCallback(() => {
    dispatch({
      type: BoardActionType.DELETE_PIECE_CONFIRM,
    });
  }, []);

  const handleAddPiece = useCallback((pieceType, isWhitePlayer) => {
    dispatch({
      type: BoardActionType.ADD_PIECE_CONFIRM,
      pieceType,
      isWhitePlayer,
    });
  }, []);

  // Validate status funcs are bellow
  const validateStatus = useCallback((validateStatusInfo) => {
    dispatch({
      type: BoardActionType.VALIDATE_STATUS,
      validateStatusInfo,
    });
  }, []);

  const handleNextStatusPopup = () => {
    dispatch({
      type: BoardActionType.NEXT_MOVE,
    });
  };

  const handleTryAgainStatusPopup = () => {
    dispatch({
      type: BoardActionType.TRY_AGAIN,
    });
  };

  return {
    boardState,
    handleClick,
    handlePromotionClick,
    handleUpdateBoard,
    handleActionModeClick,
    handleToggleUpdateMode,
    handleCloseUpdateModePopup,
    handleDeletePiece,
    handleAddPiece,
    validateStatus,
    handleNextStatusPopup,
    handleTryAgainStatusPopup,
  };
};

// Board reducer
function boardReducer(state, action) {
  const {
    type,
    block,
    newBoard,
    updateMode,
    pieceType,
    isWhitePlayer,
  } = action;
  const {
    currentBlock,
    isWhitePlayOnly,
    isWhiteNext,
    isWhite,
    availablePositions,
    movesCount,
  } = state;

  let newState;
  switch (type) {
    //
    // Add piece
    case BoardActionType.ADD_PIECE:
      return {
        ...state,
        updateModePopup: {
          open: true,
          isAdd: true,
          updateMode,
          block,
        },
      };
    case BoardActionType.ADD_PIECE_CONFIRM:
      newState = addPieceToBoard(state, pieceType, isWhitePlayer);
      return {
        ...state,
        ...newState,
        updateModePopup: {
          open: false,
          isAdd: false,
          updateMode: null,
          block: null,
        },
      };
    // Delete piece
    case BoardActionType.DELETE_PIECE:
      return {
        ...state,
        updateModePopup: {
          open: true,
          isAdd: false,
          updateMode,
          block,
        },
      };
    case BoardActionType.DELETE_PIECE_CONFIRM:
      newState = deletePieceFromBoard(state);
      return {
        ...state,
        ...newState,
        updateModePopup: {
          open: false,
          isAdd: false,
          updateMode: null,
          block: null,
        },
      };
    // Close update mode popup modal
    case BoardActionType.CLOSE_UPDATE_MODE_POPUP:
      return {
        ...state,
        updateModePopup: {
          open: false,
          isAdd: false,
          updateMode: null,
          block: null,
        },
      };
    // Toggle update mode
    case BoardActionType.TOGGLE_UPDATE_MODE:
      const { isUpdateModeOpened } = state;
      newState = isUpdateModeOpened
        ? handleDisableBlocks(state)
        : handleEnableBlocks(state);
      return {
        ...state,
        ...newState,
        isUpdateModeOpened: !isUpdateModeOpened,
      };
    // Validate status
    case BoardActionType.VALIDATE_STATUS:
      const { validateStatusInfo } = action;
      const { piece } = state;
      const isValid = validateStatus(
        validateStatusInfo.nextBlocks,
        movesCount,
        piece
      );
      return {
        ...state,
        statusPopup: {
          open: true,
          isValidMoved: isValid,
        },
      };
    // Handle next move
    case BoardActionType.NEXT_MOVE:
      return {
        ...state,
        statusPopup: {
          open: false,
          isValidMoved: false,
        },
      };
    // Main cases are bellow
    case BoardActionType.UPDATE_BOARD:
      return {
        ...state,
        board: newBoard,
        isUpdateModeOpened: false,
        movesCount: 0,
      };
    case BoardActionType.PROMOTION:
      return {
        ...state,
        board: newBoard,
        promotionForPawn: {
          piece: null,
          open: false,
        },
        movesCount: movesCount + 1,
      };
    case BoardActionType.GET_NEW_POSITIONS:
      newState = handleGetNewPositions({ ...state, block });
      return {
        ...state,
        ...newState,
        currentBlock: block,
      };
    case BoardActionType.RESET_AND_GET_NEW_POSITIONS:
      newState = handleResetAndGetNewPositions({
        ...state,
        block,
      });
      return {
        ...state,
        ...newState,
        currentBlock: block,
      };
    case BoardActionType.EN_PASSANT_CAPTURE:
      newState = handleEnPassantCapture({
        ...state,
        block,
        isMoved: false,
      });
      return {
        ...state,
        ...newState,
        currentBlock: null,
        availablePositions: null,
        ...(!isWhitePlayOnly && {
          isWhiteNext: !isWhiteNext,
          isWhite: !isWhite,
        }),
        movesCount: movesCount + 1,
      };
    case BoardActionType.CASTLING_MOVES:
      newState = handleCastlingMove({
        ...state,
        block,
        availablePositions: [
          ...availablePositions,
          currentBlock.piece.position,
        ],
      });
      return {
        ...state,
        ...newState,
        currentBlock: null,
        availablePositions: null,
        ...(!isWhitePlayOnly && {
          isWhiteNext: !isWhiteNext,
          isWhite: !isWhite,
        }),
        movesCount: movesCount + 1,
      };
    case BoardActionType.NORMAL_MOVES:
      newState = handleNormalMove({ ...state, block });
      return {
        ...state,
        ...newState,
        currentBlock: null,
        availablePositions: null,
        ...(!isWhitePlayOnly && {
          isWhiteNext: !isWhiteNext,
          isWhite: !isWhite,
        }),
      };
    case BoardActionType.NORMAL_CAPTURE:
      newState = handleCapture({
        ...state,
        block,
        isMoved: false,
      });
      return {
        ...state,
        ...newState,
        currentBlock: null,
        availablePositions: null,
        ...(!isWhitePlayOnly && {
          isWhiteNext: !isWhiteNext,
          isWhite: !isWhite,
        }),
      };

    default:
      return state;
  }
}
