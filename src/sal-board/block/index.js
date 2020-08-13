import React from 'react';
import './index.scss';

const Block = ({ onClick, white, block }) => {
  return (
    <button
      className={`sal-chess-block ${white ? 'white' : ''} ${
        block.highLight ? 'high-light' : ''
      }`}
      onClick={() => onClick(block)}
      disabled={block.disabled}
    >
      {block.piece ? block.piece.type : ''}
    </button>
  );
};

export default Block;
