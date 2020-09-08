import { findIndexInBoard } from './find-index-in-board';
import { PieceType } from '../constants';

export { isEnPassant };

function isEnPassant(board, position, isWhite) {
  const [x, y] = position;
  const index = findIndexInBoard(board, x, y);
  if (index === -1) {
    return false;
  }
  const { piece } = board[index];
  return (
    piece &&
    piece.type === PieceType.PAWN &&
    piece.isWhite !== isWhite &&
    piece.enPassant
  );
}
