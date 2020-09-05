import { PieceType } from './piece-type';
import { initialPawnPieces } from '../utils/initial-pawn-pieces';
export const INITIAL_BLACK_PAWNS = initialPawnPieces(false);
export const BLACK_PIECES = [
  // Pawn
  ...INITIAL_BLACK_PAWNS,
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
