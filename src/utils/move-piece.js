import { PieceType } from '../constants';

export { movePiece };

function movePiece(board, currentBlock, newBlock, isWhiteNext) {
  const newBoard = [...board];
  // Add piece from current block for new block
  const newIndex = newBoard.findIndex(
    (block) =>
      block.position[0] === newBlock.position[0] &&
      block.position[1] === newBlock.position[1]
  );
  newBoard[newIndex].piece = currentBlock.piece;
  newBoard[newIndex].piece.position = newBlock.position;
  switch (currentBlock.piece.type) {
    case PieceType.PAWN:
      newBoard[newIndex].piece.line = isWhiteNext
        ? 7 - newBlock[0]
        : newBlock[0];
      break;
    case PieceType.ROOK:
    case PieceType.KING:
      if (!currentBlock.piece.isMoved) {
        newBoard[newIndex].piece.isMoved = true;
      }
      break;

    default:
      break;
  }
  // Remove piece from current block
  const currentIndex = newBoard.findIndex(
    (block) =>
      block.position[0] === currentBlock.position[0] &&
      block.position[1] === currentBlock.position[1]
  );
  newBoard[currentIndex].piece = null;
  return newBoard;
}
