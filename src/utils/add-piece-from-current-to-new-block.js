import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';

export { addPieceFromCurrentToNewBlock };

function addPieceFromCurrentToNewBlock(
  board,
  currentBlock,
  newBlock,
  isWhiteNext
) {
  const { piece } = currentBlock;
  const { position: newPosition } = newBlock;
  const index = findIndexInBoard({
    board,
    x: newPosition[0],
    y: newPosition[1],
  });
  board[index].piece = piece;
  board[index].piece.position = newPosition;
  if (currentBlock.piece.type === PieceType.PAWN) {
    board[index].piece.line = isWhiteNext
      ? 8 - newPosition[0]
      : newPosition[0] + 1;
  }
  return board;
}
