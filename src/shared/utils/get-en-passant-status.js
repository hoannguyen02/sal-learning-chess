import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';

export { getEnPassantStatus };

function getEnPassantStatus(board, lineNumber, newPosition, isWhite) {
  if (lineNumber !== 4) {
    return false;
  }
  const [x, y] = newPosition;
  // Check if any pawns can capture by en passant rules
  return (
    [
      [x, y - 1],
      [x, y + 1],
    ].filter(([x, y]) => {
      const newIndex = findIndexInBoard(board, x, y);
      if (newIndex === -1) {
        return false;
      }
      const { piece } = board[newIndex];
      return (
        piece && piece.type === PieceType.PAWN && piece.isWhite !== isWhite
      );
    }).length > 0
  );
}
