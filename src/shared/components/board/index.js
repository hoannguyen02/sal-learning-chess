/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Block from './block';
import './index.scss';
import PromotionPopup from './promotion-popup';
import VerticalCaption from './vertical-caption';
import HorizontalCaption from './horizontal-caption';
import { useBoard } from '../../hooks';

const Board = (props) => {
  const { board: newBoard, updateMode } = props;
  const {
    boardState,
    handleClick,
    handlePromotionClick,
    handleUpdateBoard,
    handleActionModeClick,
    handleToggleUpdateMode,
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
    isWhitePlayOnly: props.isWhitePlayOnly,
    isCastlingMove: false,
    isUpdateModeOpened: false,
  });
  useEffect(() => {
    newBoard && handleUpdateBoard(newBoard, isUpdateModeOpened);
  }, [newBoard]);

  const {
    board,
    isWhiteNext,
    promotionForPawn,
    isUpdateModeOpened,
  } = boardState;

  return board && Array.isArray(board) && board.length > 0 ? (
    <div className="board">
      <div className="clear-fix">
        <VerticalCaption />
        <HorizontalCaption />
        {board.map((block, index) => (
          <Block
            block={block}
            isUpdateModeOpened={isUpdateModeOpened}
            onClick={(block) => handleClick(block, boardState)}
            onActionModeClick={handleActionModeClick}
            whiteClass={
              (block.position[0] % 2 === 0 && block.position[1] % 2 !== 0) ||
              (block.position[0] % 2 !== 0 && block.position[1] % 2 === 0)
                ? 'white'
                : ''
            }
            key={`chess-block-${index}`}
            index={index}
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
      {updateMode && (
        <button className="update-mode" onClick={handleToggleUpdateMode}>
          Update Mode
        </button>
      )}
    </div>
  ) : (
    ''
  );
};

export default Board;
