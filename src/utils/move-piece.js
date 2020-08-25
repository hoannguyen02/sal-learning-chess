import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';
import { removePieceFromBlock } from './remove-piece-from-block';
export { movePiece };

function movePiece(
  board,
  currentBlock,
  newBlock,
  isWhiteNext,
  playerName,
  isMoved
) {
  let newBoard = [...board];
  const { piece } = currentBlock;
  const { position: newPos } = newBlock;
  if (!isMoved) {
    newBoard = removePieceFromBlock(board, newBlock);
  }
  // Check following steps to update information for piece
  // Update new position
  // Update line number, justMoved state in case Pawn piece
  // Update isMoved state incase Rook or King in order to check castling move later on
  const newIndex = findIndexInBoard({ board, x: newPos[0], y: newPos[1] });
  piece.position = newPos;
  switch (piece.type) {
    case PieceType.PAWN:
      const lineNumber = isWhiteNext ? 8 - newPos[0] : newPos[0] + 1;
      piece.line = lineNumber;
      newBoard = resetJustMovedStatus({ board, playerName });
      piece.justMoved = lineNumber === 4;
      break;
    case PieceType.ROOK:
    case PieceType.KING:
      if (!piece.isMoved) {
        piece.isMoved = true;
      }
      break;

    default:
      break;
  }
  piece.index = newIndex; // Save index incase use for promotion
  newBoard[newIndex].piece = piece;
  return [piece, newBoard];
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
