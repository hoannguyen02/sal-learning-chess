import { PieceType } from './piece-type';

export const WHITE_PIECES = [
  // Pawn
  { prevPosition: null, position: [6, 0], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 1], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 2], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 3], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 4], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 5], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 6], line: 1, type: PieceType.PAWN },
  { prevPosition: null, position: [6, 7], line: 1, type: PieceType.PAWN },
  // Rook
  { prevPosition: null, position: [7, 0], type: PieceType.ROOK },
  { prevPosition: null, position: [7, 7], type: PieceType.ROOK },
  // Knight
  { prevPosition: null, position: [7, 1], type: PieceType.KNIGHT },
  { prevPosition: null, position: [7, 6], type: PieceType.KNIGHT },
  // Bishop
  { prevPosition: null, position: [7, 2], type: PieceType.BISHOP },
  { prevPosition: null, position: [7, 5], type: PieceType.BISHOP },
  // Queen
  { prevPosition: null, position: [7, 3], type: PieceType.QUEEN },
  { prevPosition: null, position: [7, 4], type: PieceType.KING },
];
