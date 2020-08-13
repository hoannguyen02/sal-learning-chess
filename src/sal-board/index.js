import React from 'react';
import Block from './block';
import './index.scss';

const SALBoard = ({ board, onClick }) => {
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
      <div className="sal-board-caption"></div>
    </div>
  );
};

export default SALBoard;
