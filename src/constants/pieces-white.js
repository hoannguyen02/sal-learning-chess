import { PieceType } from './piece-type';

export const WHITE_PIECES = [
  // Pawn
  {
    isWhite: true,
    position: [6, 0],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 1],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 2],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 3],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 4],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 5],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 6],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: true,
    position: [6, 7],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  },
  // Rook
  { isWhite: true, position: [7, 0], type: PieceType.ROOK, isMoved: false },
  { isWhite: true, position: [7, 7], type: PieceType.ROOK, isMoved: false },
  // Knight
  { isWhite: true, position: [7, 1], type: PieceType.KNIGHT },
  { isWhite: true, position: [7, 6], type: PieceType.KNIGHT },
  // Bishop
  { isWhite: true, position: [7, 2], type: PieceType.BISHOP },
  { isWhite: true, position: [7, 5], type: PieceType.BISHOP },
  // Queen
  { isWhite: true, position: [7, 3], type: PieceType.QUEEN },
  // King
  { isWhite: true, position: [7, 4], type: PieceType.KING, isMoved: false },
];
