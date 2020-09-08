import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';
export { movePiece };

function movePiece(state) {
  const { board, currentBlock, block: newBlock, isWhiteNext, isWhite } = state;
  let newBoard = [...board];
  const { piece } = currentBlock;
  const { position: newPos } = newBlock;
  // Check following steps to update information for piece
  // Update new position
  // Update line number, enPassant state in case Pawn piece
  // Update isMoved state incase Rook or King in order to check castling move later on
  const newIndex = findIndexInBoard(board, newPos[0], newPos[1]);
  piece.position = newPos;
  switch (piece.type) {
    case PieceType.PAWN:
      const lineNumber = isWhiteNext ? 8 - newPos[0] : newPos[0] + 1;
      piece.line = lineNumber;
      newBoard = resetEnPassantStatus({ board, isWhite: !isWhite });
      piece.enPassant = isEnPassant(board, lineNumber, newPos, isWhiteNext);
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
  return {
    ...state,
    piece,
    board: newBoard,
  };
}

function isEnPassant(board, lineNumber, newPosition, isWhite) {
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

function resetEnPassantStatus({ board, isWhite }) {
  return board.map((block) => {
    const { piece } = block;
    // Reset enPassant state to false if those are at third line
    if (
      piece &&
      isWhite === piece.isWhite &&
      piece.type === PieceType.PAWN &&
      piece.line === 4
    ) {
      return {
        ...block,
        ...(piece && { piece: { ...block.piece, enPassant: false } }),
      };
    }
    return block;
  });
}
