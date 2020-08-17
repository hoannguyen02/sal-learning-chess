export { highLightBlocks };
// Hight light blocks that user can move
function highLightBlocks(board, positions) {
  const newBoard = [...board];
  positions.forEach((position) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === position[0] && block.position[1] === position[1]
    );
    if (idx >= 0) {
      newBoard[idx].highLight = true;
      newBoard[idx].catchHighLight = newBoard[idx].piece !== null;
      newBoard[idx].disabled = false;
    }
  });
  return newBoard;
}
