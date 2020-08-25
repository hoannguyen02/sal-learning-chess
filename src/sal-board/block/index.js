import React from 'react';
import './index.scss';
import PieceIcon from '../icons';

const Block = ({ onClick, white, block }) => {
  return (
    <button
      className={`sal-chess-block ${white ? 'white' : ''} ${
        block.highLight ? 'high-light' : ''
      } ${block.catchHighLight ? 'catch-high-light' : ''}`}
      onClick={() => onClick(block)}
      disabled={block.disabled}
    >
      {block.piece && (
        <PieceIcon type={block.piece.type} isWhite={block.piece.isWhite} />
      )}
    </button>
  );
};

export default Block;
