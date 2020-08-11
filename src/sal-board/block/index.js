import React from 'react';
import './index.scss';

const Block = ({ onClick, disabled, white, block }) => {
  return (
    <button
      className={`sal-chess-block ${white ? 'white' : ''}`}
      onClick={() => onClick(block)}
      disabled={disabled}
    >
      {block.piece ? block.piece.type : ''}
    </button>
  );
};

export default Block;
