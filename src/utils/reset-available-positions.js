export { resetAvailablePositions };
// Reset available positions
function resetAvailablePositions(board, positions) {
  const newBoard = [...board];
  positions.forEach((position) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === position[0] && block.position[1] === position[1]
    );
    if (idx >= 0) {
      newBoard[idx].highLight = false;
      newBoard[idx].disabled = true;
    }
  });
  return newBoard;
}
