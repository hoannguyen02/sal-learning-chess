import { PieceType } from '../constants';

export { setupPiecesForPlayers };

function setupPiecesForPlayers(board, pieces, isWhite) {
  const newBoard = [...board];
  pieces.forEach((piece) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === piece.position[0] &&
        block.position[1] === piece.position[1]
    );
    if (idx >= 0) {
      newBoard[idx].piece = piece;
      if (
        (piece.type === PieceType.PAWN || piece.type === PieceType.KNIGHT) &&
        isWhite === piece.isWhite
      ) {
        newBoard[idx].disabled = false;
      }
    }
  });
  return newBoard;
}
