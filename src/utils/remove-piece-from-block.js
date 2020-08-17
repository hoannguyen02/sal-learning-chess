export { removePieceFromBlock };

function removePieceFromBlock(board, block) {
  const currentIndex = board.findIndex(
    (b) =>
      b.position[0] === block.position[0] && b.position[1] === block.position[1]
  );
  board[currentIndex].piece = null;
  return board;
}
