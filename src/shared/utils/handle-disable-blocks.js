export { handleDisableBlocks };

function handleDisableBlocks(state) {
  const { board, isWhite } = state;
  const newBoard = board.map((block) => ({
    ...block,
    disabled: !(block.piece && block.piece.isWhite === isWhite),
  }));
  return {
    ...state,
    board: newBoard,
  };
}
