/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Board from '../board';
import {
  setupBoard,
  handleCapture,
  isCastlingMove,
  handleNormalMove,
  handleGetNewPositions,
  handleResetAndGetNewPositions,
  handleCastlingMove,
  highLightBlocksWithType,
  isEnPassant,
  handleEnPassantCapture,
} from '../../utils';

const Game = (props) => {
  const { whitePieces, blackPieces, disabledPieces, pieceType } = props;

  const [state, setState] = useState({
    board: null,
    currentBlock: null,
    isWhiteNext: true,
    isWhite: true,
    availablePositions: null,
    promotionForPawn: {
      open: false,
      piece: null,
    },
  });

  useEffect(() => {
    // Setup pieces for 2 players in board
    const newBoard = setupBoard(
      blackPieces,
      whitePieces,
      state.isWhite,
      disabledPieces
    );
    setState((prevState) => ({
      ...prevState,
      board: newBoard,
    }));
    return () => {
      //
    };
  }, []);

  useEffect(() => {
    if (state.board) {
      const newState = highLightBlocksWithType({ ...state, pieceType });
      setState((prevState) => ({
        ...prevState,
        ...newState,
        pieceType,
      }));
    }
    return () => {
      //
    };
  }, [pieceType]);

  const handleClick = (block) => {
    const { currentBlock } = state;

    if (!currentBlock) {
      /**
       * 1. Get available blocks to move and which ones can capture then Hight hight light those
       * 2. Set current block state in order to move or capture later on
       */
      const newState = handleGetNewPositions({ ...state, block });
      setState((prevState) => ({
        ...prevState,
        ...newState,
        currentBlock: block,
      }));
      return;
    } else {
      // Incase user click again in that block
      if (
        currentBlock.position[0] === block.position[0] &&
        currentBlock.position[1] === block.position[1]
      ) {
        return;
      }
      // Incase user click another blocks, meaning that not move or capture
      // We need to reset previous available positions and reset highlight
      // Then get new available position for that block
      if (block.piece && block.piece.isWhite === currentBlock.piece.isWhite) {
        const newState = handleResetAndGetNewPositions({
          ...state,
          block,
        });
        setState((prevState) => ({
          ...prevState,
          ...newState,
          currentBlock: block,
        }));
      } else {
        // Move if there is no piece in block, otherwise capture
        if (!block.piece) {
          const [x, y] = block.position;
          const { isWhite, isWhiteNext } = state;
          const enX = isWhiteNext ? x + 1 : x - 1;
          if (isEnPassant(board, [enX, y], isWhite)) {
            const newState = handleEnPassantCapture({
              ...state,
              block,
              isMoved: false,
            });
            setState((prevState) => ({
              ...prevState,
              ...newState,
              currentBlock: null,
              availablePositions: null,
              isWhiteNext: !prevState.isWhiteNext,
              isWhite: !prevState.isWhite,
            }));
          } else if (isCastlingMove(currentBlock, block)) {
            const newState = handleCastlingMove({
              ...state,
              block,
              availablePositions: [
                ...state.availablePositions,
                currentBlock.piece.position,
              ],
            });
            setState((prevState) => ({
              ...prevState,
              ...newState,
              currentBlock: null,
              availablePositions: null,
              isWhiteNext: !prevState.isWhiteNext,
              isWhite: !prevState.isWhite,
            }));
          } else {
            const newState = handleNormalMove({ ...state, block });
            setState((prevState) => ({
              ...prevState,
              ...newState,
              currentBlock: null,
              availablePositions: null,
              isWhiteNext: !prevState.isWhiteNext,
              isWhite: !prevState.isWhite,
            }));
          }
        } else {
          const newState = handleCapture({
            ...state,
            block,
            isMoved: false,
          });
          setState((prevState) => ({
            ...prevState,
            ...newState,
            currentBlock: null,
            availablePositions: null,
            isWhiteNext: !prevState.isWhiteNext,
            isWhite: !prevState.isWhite,
          }));
        }
      }
    }
  };

  const handlePromotionClick = (type) => {
    const { promotionForPawn, board } = state;
    const newBoard = [...board];
    newBoard[promotionForPawn.piece.index].piece.type = type;
    setState((prevState) => ({
      ...prevState,
      board: newBoard,
      promotionForPawn: {
        piece: null,
        open: false,
      },
    }));
  };

  const { board, promotionForPawn, isWhiteNext } = state;

  return (
    <Board
      board={board}
      promotion={promotionForPawn}
      isWhiteNext={isWhiteNext}
      onClick={handleClick}
      onPromotionClick={handlePromotionClick}
    />
  );
};

export default Game;
