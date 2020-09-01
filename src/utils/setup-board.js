import { PieceType } from '../constants';
import { generateBlocks } from './generate-blocks';
import { findIndexInBoard } from './find-index-in-board';
export { setupBoard };

function setupBoard(blackPieces, whitePieces, isWhite, disabledPieces) {
  const board = generateBlocks();
  [...blackPieces, ...whitePieces].forEach((piece) => {
    const idx = findIndexInBoard(board, piece.position[0], piece.position[1]);
    if (idx >= 0) {
      board[idx].piece = piece;
      if (
        !disabledPieces &&
        (piece.type === PieceType.PAWN || piece.type === PieceType.KNIGHT) &&
        isWhite === piece.isWhite
      ) {
        board[idx].disabled = false;
      }
    }
  });
  return board;
}
