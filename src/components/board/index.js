/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Block from './block';
import './index.scss';
import PromotionPopup from './promotion-popup';
import VerticalCaption from './vertical-caption';
import HorizontalCaption from './horizontal-caption';
import { useBoard } from '../../hooks';

const Board = (props) => {
  const { pieces, disabledPieces, pieceType, isWhitePlayOnly } = props;
  const {
    boardState,
    handleClick,
    handlePromotionClick,
    handleUpdateBoard,
    highLightBasedOnTypeHandler,
  } = useBoard({
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
    handleUpdateBoard(boardState, pieces, disabledPieces, isWhitePlayOnly);
  }, [pieces, disabledPieces, handleUpdateBoard]);

  useEffect(() => {
    boardState.board &&
      highLightBasedOnTypeHandler(boardState.board, pieceType);
  }, [pieceType, highLightBasedOnTypeHandler]);

  const { board, isWhiteNext, promotionForPawn } = boardState;

  return board && Array.isArray(board) && board.length > 0 ? (
    <div className="board">
      <div className="clear-fix">
        <VerticalCaption />
        <HorizontalCaption />
        {board.map((block, index) => (
          <Block
            block={block}
            onClick={(block) => handleClick(block, boardState)}
            whiteClass={
              (block.position[0] % 2 === 0 && block.position[1] % 2 !== 0) ||
              (block.position[0] % 2 !== 0 && block.position[1] % 2 === 0)
                ? 'white'
                : ''
            }
            key={`chess-block-${index}`}
          />
        ))}
      </div>
      {promotionForPawn && promotionForPawn.open && (
        <PromotionPopup
          piece={promotionForPawn.piece}
          open={promotionForPawn.open}
          onClick={(type) => handlePromotionClick(type, boardState)}
          isWhiteNext={isWhiteNext}
        />
      )}
    </div>
  ) : (
    ''
  );
};

export default Board;
