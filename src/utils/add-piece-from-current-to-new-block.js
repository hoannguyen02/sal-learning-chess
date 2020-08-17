import { PieceType } from '../constants';

export { addPieceFromCurrentToNewBlock };

function addPieceFromCurrentToNewBlock(
  board,
  currentBlock,
  newBlock,
  isWhiteNext
) {
  const index = board.findIndex(
    (block) =>
      block.position[0] === newBlock.position[0] &&
      block.position[1] === newBlock.position[1]
  );
  board[index].piece = currentBlock.piece;
  board[index].piece.position = newBlock.position;
  if (currentBlock.piece.type === PieceType.PAWN) {
    board[index].piece.line = isWhiteNext ? 7 - newBlock[0] : newBlock[0];
  }
  return board;
}
