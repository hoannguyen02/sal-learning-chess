import React from 'react';
import './index.scss';
import PieceIcon from '../icons';
import Action from './Action';

const Block = (props) => {
  const {
    onClick,
    whiteClass,
    block,
    index,
    onActionModeClick,
    isUpdateModeOpened,
  } = props;
  const enPassant = block.piece && block.piece.enPassant;
  return (
    <button
      className={`chess-block block-base ${whiteClass} ${
        block.highLight ? 'high-light' : ''
      } ${block.catchHighLight ? 'capture-high-light' : ''} ${
        block.castlingHighLight ? 'castling-high-light' : ''
      }`}
      onClick={() => onClick(block)}
      disabled={block.disabled}
      style={{ opacity: block.opacity }}
    >
      {block.piece && (
        <PieceIcon
          type={block.piece.type}
          isWhite={block.piece.isWhite}
          enPassant={enPassant}
        />
      )}
      {isUpdateModeOpened && (
        <Action index={index} onClick={onActionModeClick} />
      )}
    </button>
  );
};

export default Block;
