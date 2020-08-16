export { movePiece };

function movePiece(board, currentBlock, newBlock) {
  const newBoard = [...board];
  // Add piece from current block for new block
  const newIndex = newBoard.findIndex(
    (block) =>
      block.position[0] === newBlock.position[0] &&
      block.position[1] === newBlock.position[1]
  );
  newBoard[newIndex].piece = currentBlock.piece;
  // Remove piece from current block
  const currentIndex = newBoard.findIndex(
    (block) =>
      block.position[0] === currentBlock.position[0] &&
      block.position[1] === currentBlock.position[1]
  );
  newBoard[currentIndex].piece = null;
  return newBoard;
}
