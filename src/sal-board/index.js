import React from 'react';
import Block from './block';
import './index.scss';
import PromotionPopup from './promotion-popup';

const SALBoard = (props) => {
  const { board, onClick, promotion, onPromotionClick, isWhiteNext } = props;
  return (
    <div className="sal-board">
      <div className="sal-board-game sal-chess-clear-fix">
        {board.map((block, index) => (
          <Block
            block={block}
            onClick={onClick}
            whiteClass={
              (block.position[0] % 2 === 0 && block.position[1] % 2 !== 0) ||
              (block.position[0] % 2 !== 0 && block.position[1] % 2 === 0)
                ? 'white'
                : ''
            }
            key={`sal-chess-block-${index}`}
          />
        ))}
      </div>
      {promotion.open && (
        <PromotionPopup
          piece={promotion.piece}
          open={promotion.open}
          onClick={onPromotionClick}
          isWhiteNext={isWhiteNext}
        />
      )}
    </div>
  );
};

export default SALBoard;
