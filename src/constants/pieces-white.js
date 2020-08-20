import { PieceType } from './piece-type';

export const WHITE_PIECES = [
  // Pawn
  { position: [6, 0], line: 1, type: PieceType.PAWN },
  { position: [6, 1], line: 1, type: PieceType.PAWN },
  { position: [6, 2], line: 1, type: PieceType.PAWN },
  { position: [6, 3], line: 1, type: PieceType.PAWN },
  { position: [6, 4], line: 1, type: PieceType.PAWN },
  { position: [6, 5], line: 1, type: PieceType.PAWN },
  { position: [6, 6], line: 1, type: PieceType.PAWN },
  { position: [6, 7], line: 1, type: PieceType.PAWN },
  // Rook
  { position: [7, 0], type: PieceType.ROOK },
  { position: [7, 7], type: PieceType.ROOK },
  // Knight
  { position: [7, 1], type: PieceType.KNIGHT },
  { position: [7, 6], type: PieceType.KNIGHT },
  // Bishop
  { position: [7, 2], type: PieceType.BISHOP },
  { position: [7, 5], type: PieceType.BISHOP },
  // Queen
  { position: [7, 3], type: PieceType.QUEEN },
  // King
  { position: [7, 4], type: PieceType.KING },
];
