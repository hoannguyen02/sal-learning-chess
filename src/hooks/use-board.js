import { useReducer, useCallback } from 'react';
import {
  isEnPassant,
  handleGetNewPositions,
  handleResetAndGetNewPositions,
  handleEnPassantCapture,
  handleCastlingMove,
  handleNormalMove,
  handleCapture,
} from '../utils';
import { PieceType } from '../constants';

const BoardActionType = {
  GET_NEW_POSITIONS: 'GET_NEW_POSITIONS',
  RESET_AND_GET_NEW_POSITIONS: 'RESET_AND_GET_NEW_POSITIONS',
  NORMAL_MOVES: 'NORMAL_MOVES',
  CASTLING_MOVES: 'CASTLING_MOVES',
  NORMAL_CAPTURE: 'NORMAL_CAPTURE',
  EN_PASSANT_CAPTURE: 'EN_PASSANT_CAPTURE',
  PROMOTION: 'PROMOTION',
  UPDATE_BOARD: 'UPDATE_BOARD',
};

export const useBoard = (state) => {
  const [boardState, dispatch] = useReducer(boardReducer, state);

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

  const handleClick = useCallback((block, state, isCastling) => {
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

  return {
    boardState,
    handleClick,
    handlePromotionClick,
    handleUpdateBoard,
  };
};

// Board reducer
function boardReducer(state, action) {
  const { type, block, newBoard } = action;
  const {
    currentBlock,
    isWhitePlayOnly,
    isWhiteNext,
    isWhite,
    availablePositions,
  } = state;

  let newState;
  switch (type) {
    case BoardActionType.UPDATE_BOARD:
      return {
        ...state,
        board: newBoard,
      };
    case BoardActionType.PROMOTION:
      return {
        ...state,
        board: newBoard,
        promotionForPawn: {
          piece: null,
          open: false,
        },
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
