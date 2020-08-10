import React from 'react';
import Block from './block';
import './index.scss';

const SALBoard = ({ blocks, onClick }) => {
  return (
    <div className="sal-board">
      <div className="sal-board-game sal-chess-clear-fix">
        {blocks.map((block, index) => (
          <Block
            block={block}
            onClick={onClick}
            white={
              (block[0].index % 2 === 0 && block[1].index % 2 !== 0) ||
              (block[0].index % 2 !== 0 && block[1].index % 2 === 0)
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
