import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';
export { movePiece };

function movePiece(board, currentBlock, newBlock, isWhiteNext, playerName) {
  let newBoard = [...board];
  const { position: curPos } = currentBlock;
  const { position: newPos } = newBlock;
  // Add piece from current block for new block
  const newIndex = findIndexInBoard({ board, x: newPos[0], y: newPos[1] });
  newBoard[newIndex].piece = currentBlock.piece;
  newBoard[newIndex].piece.position = newPos;
  switch (currentBlock.piece.type) {
    case PieceType.PAWN:
      const lineNumber = isWhiteNext ? 8 - newPos[0] : newPos[0] + 1;
      newBoard[newIndex].piece.line = lineNumber;
      newBoard = resetJustMovedStatus({ board, playerName });
      if (lineNumber === 4) {
        newBoard[newIndex].piece.justMoved = true;
      }
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
  const currentIndex = findIndexInBoard({ board, x: curPos[0], y: curPos[1] });
  newBoard[currentIndex].piece = null;
  return newBoard;
}

function resetJustMovedStatus({ board, playerName }) {
  return board.map((block) => {
    const { piece } = block;
    // Reset justMoved state to false if those are at third line
    if (
      piece &&
      playerName === piece.playerName &&
      piece.type === PieceType.PAWN &&
      piece.line === 4
    ) {
      return {
        ...block,
        ...(piece && { piece: { ...block.piece, justMoved: false } }),
      };
    }
    return block;
  });
}
