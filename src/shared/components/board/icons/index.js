import React from 'react';
import { PieceType } from '../../../constants';
import BlackKing from './BlackKing';
import WhiteKing from './WhiteKing';
import BlackQueen from './BlackQueen';
import WhiteQueen from './WhiteQueen';
import WhiteKnight from './WhiteKnight';
import BlackKnight from './BlackKnight';
import BlackRook from './BlackRook';
import WhiteRook from './WhiteRook';
import WhiteBishop from './WhiteBishop';
import BlackBishop from './BlackBishop';
import Pawn from './Pawn';

const PieceIcon = ({ type, isWhite, canBeEnPassantCapture }) => {
  switch (type) {
    case PieceType.KING:
      return isWhite ? <WhiteKing /> : <BlackKing />;
    case PieceType.QUEEN:
      return isWhite ? <WhiteQueen /> : <BlackQueen />;
    case PieceType.PAWN:
      return (
        <Pawn
          fill={canBeEnPassantCapture ? '#e86666' : isWhite ? '#fff' : '#000'}
        />
      );
    case PieceType.KNIGHT:
      return isWhite ? <WhiteKnight /> : <BlackKnight />;
    case PieceType.ROOK:
      return isWhite ? <WhiteRook /> : <BlackRook />;
    case PieceType.BISHOP:
      return isWhite ? <WhiteBishop /> : <BlackBishop />;

    default:
      return '';
  }
};

export default PieceIcon;
