import { PieceType } from './piece-type';
export const BLACK_PIECES = [
  // Pawn
  { prevPosition: null, position: [1, 0], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 1], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 2], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 3], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 4], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 5], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 6], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [1, 7], line: 1, type: PieceType.PAWN },
  // Rook
  { prevPosition: null, position: [0, 0], type: PieceType.ROOK },
  { prevPosition: null, position: [0, 7], type: PieceType.ROOK },
  // Knight
  { prevPosition: null, position: [0, 1], type: PieceType.KNIGHT },
  { prevPosition: null, position: [0, 6], type: PieceType.KNIGHT },
  // Bishop
  { prevPosition: null, position: [0, 2], type: PieceType.BISHOP },
  { prevPosition: null, position: [0, 5], type: PieceType.BISHOP },
  // Queen
  { prevPosition: null, position: [0, 3], type: PieceType.QUEEN },
  { prevPosition: null, position: [0, 4], type: PieceType.KING },
];
