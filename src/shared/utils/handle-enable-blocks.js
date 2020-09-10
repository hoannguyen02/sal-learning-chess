export { handleEnableBlocks };

function handleEnableBlocks(state) {
  const newBoard = state.board.map((block) => ({
    ...block,
    disabled: false,
    highLight: false,
    catchHighLight: false,
  }));
  return {
    ...state,
    board: newBoard,
    availablePositions: null,
    currentBlock: null,
    isCastlingMove: false,
  };
}
