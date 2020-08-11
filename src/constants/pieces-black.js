import { PieceType } from './piece-type';
export const BLACK_PIECES = [
  // Pawn
  {
    position: [1, 0],
    type: PieceType.PAWN,
  },
  {
    position: [1, 1],
    type: PieceType.PAWN,
  },
  {
    position: [1, 2],
    type: PieceType.PAWN,
  },
  {
    position: [1, 3],
    type: PieceType.PAWN,
  },
  {
    position: [1, 4],
    type: PieceType.PAWN,
  },
  {
    position: [1, 5],
    type: PieceType.PAWN,
  },
  {
    position: [1, 6],
    type: PieceType.PAWN,
  },
  {
    position: [1, 7],
    type: PieceType.PAWN,
  },
  // Rook
  {
    position: [0, 0],
    type: PieceType.ROOK,
  },
  {
    position: [0, 7],
    type: PieceType.ROOK,
  },
  // Knight
  {
    position: [0, 1],
    type: PieceType.KNIGHT,
  },
  {
    position: [0, 6],
    type: PieceType.KNIGHT,
  },
  // Bishop
  {
    position: [0, 2],
    type: PieceType.BISHOP,
  },
  {
    position: [0, 5],
    type: PieceType.BISHOP,
  },
  // Queen
  {
    position: [0, 3],
    type: PieceType.QUEEN,
  },
  {
    position: [0, 4],
    type: PieceType.KING,
  },
];
