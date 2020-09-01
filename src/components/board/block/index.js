import React from 'react';
import './index.scss';
import PieceIcon from '../icons';

const Block = ({ onClick, whiteClass, block }) => {
  return (
    <button
      className={`chess-block block-base ${whiteClass} ${
        block.highLight ? 'high-light' : ''
      } ${block.catchHighLight ? 'catch-high-light' : ''}`}
      onClick={() => onClick(block)}
      disabled={block.disabled}
      style={{ opacity: block.opacity }}
    >
      {block.piece && (
        <PieceIcon type={block.piece.type} isWhite={block.piece.isWhite} />
      )}
    </button>
  );
};

export default Block;
