import { PieceType } from '../constants/piece-type';

export { initialPawnPieces };
function initialPawnPieces(isWhite) {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((item) => ({
    isWhite: isWhite,
    position: [isWhite ? 6 : 1, item],
    line: 1,
    enPassant: false,
    type: PieceType.PAWN,
  }));
}
