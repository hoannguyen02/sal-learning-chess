import React from 'react';
import './index.scss';
import PieceIcon from '../icons';
import Action from './Action';

const Block = (props) => {
  const {
    onClick,
    whiteClass,
    block,
    onActionModeClick,
    isUpdateModeOpened,
  } = props;
  const canBeEnPassantCapture =
    block.piece && block.piece.canBeEnPassantCapture;
  return (
    <button
      className={`chess-block block-base ${whiteClass} ${
        block.highLight ? 'high-light' : ''
      } ${block.catchHighLight ? 'capture-high-light' : ''} ${
        block.castlingHighLight ? 'castling-high-light' : ''
      } ${isUpdateModeOpened && block.piece ? 'block-update-mode' : ''}`}
      onClick={() => !isUpdateModeOpened && onClick(block)}
      disabled={block.disabled}
      style={{ opacity: block.opacity }}
    >
      {block.piece && (
        <PieceIcon
          type={block.piece.type}
          isWhite={block.piece.isWhite}
          canBeEnPassantCapture={canBeEnPassantCapture}
        />
      )}
      {isUpdateModeOpened && (
        <Action
          piece={block.piece}
          onClick={(mode) => onActionModeClick(mode, block)}
        />
      )}
    </button>
  );
};

export default Block;
