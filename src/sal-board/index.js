import React from 'react';
import Block from './block';
import Promotions from './promotions';
import './index.scss';

const SALBoard = (props) => {
  const { board, onClick, promotion, onPromotionClick, isWhiteNext } = props;
  return (
    <div className="sal-board">
      <div className="sal-board-game sal-chess-clear-fix">
        {board.map((block, index) => (
          <Block
            block={block}
            onClick={onClick}
            white={
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
        <Promotions
          piece={promotion.piece}
          onClick={onPromotionClick}
          isWhiteNext={isWhiteNext}
        />
      )}
    </div>
  );
};

export default SALBoard;
