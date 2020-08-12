export { updateBoard };

function updateBoard(board, pieces) {
  const newBoard = [...board];
  pieces.forEach((piece) => {
    const idx = newBoard.findIndex(
      (block) => block.pos[0] === piece.pos[0] && block.pos[1] === piece.pos[1]
    );
    if (idx >= 0) {
      newBoard[idx].piece = piece;
      newBoard[idx].disabled = false;
    }
  });
  return newBoard;
}
