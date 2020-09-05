import { PieceType } from './piece-type';
import { initialPawnPieces } from '../utils/initial-pawn-pieces';

export const INITIAL_WHITE_PAWNS = initialPawnPieces(true);

export const WHITE_PIECES = [
  // Pawn
  ...INITIAL_WHITE_PAWNS,
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
