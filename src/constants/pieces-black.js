import { PieceType } from './piece-type';
export const BLACK_PIECES = [
  // Pawn
  {
    isWhite: false,
    position: [1, 0],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 1],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 2],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 3],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 4],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 5],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 6],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  {
    isWhite: false,
    position: [1, 7],
    line: 1,
    justMoved: false,
    type: PieceType.PAWN,
  },
  // Rook
  { isWhite: false, position: [0, 0], type: PieceType.ROOK, isMoved: false },
  { isWhite: false, position: [0, 7], type: PieceType.ROOK, isMoved: false },
  // Knight
  { isWhite: false, position: [0, 1], type: PieceType.KNIGHT },
  { isWhite: false, position: [0, 6], type: PieceType.KNIGHT },
  // Bishop
  { isWhite: false, position: [0, 2], type: PieceType.BISHOP },
  { isWhite: false, position: [0, 5], type: PieceType.BISHOP },
  // Queen
  { isWhite: false, position: [0, 3], type: PieceType.QUEEN },
  // King
  { isWhite: false, position: [0, 4], type: PieceType.KING, isMoved: false },
];
