export { resetAvailablePositions };
// Reset available positions
function resetAvailablePositions(state) {
  const { board, availablePositions } = state;
  const newBoard = [...board];
  availablePositions.forEach((position) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === position[0] && block.position[1] === position[1]
    );
    if (idx >= 0) {
      newBoard[idx].highLight = false;
      newBoard[idx].disabled = true;
    }
  });
  return {
    ...state,
    board: newBoard,
  };
}
