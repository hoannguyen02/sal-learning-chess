import React from 'react';
import { PieceType } from '../../../constants';
import BlackKing from './BlackKing';
import WhiteKing from './WhiteKing';
import BlackQueen from './BlackQueen';
import WhiteQueen from './WhiteQueen';
import BlackPawn from './BlackPawn';
import WhitePawn from './WhitePawn';
import WhiteKnight from './WhiteKnight';
import BlackKnight from './BlackKnight';
import BlackRook from './BlackRook';
import WhiteRook from './WhiteRook';
import WhiteBishop from './WhiteBishop';
import BlackBishop from './BlackBishop';

const PieceIcon = ({ type, isWhite }) => {
  switch (type) {
    case PieceType.KING:
      return isWhite ? <WhiteKing /> : <BlackKing />;
    case PieceType.QUEEN:
      return isWhite ? <WhiteQueen /> : <BlackQueen />;
    case PieceType.PAWN:
      return isWhite ? <WhitePawn /> : <BlackPawn />;
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
