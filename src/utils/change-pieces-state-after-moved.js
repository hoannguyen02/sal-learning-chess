export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(state) {
  const { board, isWhite } = state;
  const newBoard = board.map((block) => {
    const enabled = block.piece ? !isWhite === block.piece.isWhite : false;
    return {
      ...block,
      disabled: !enabled,
      catchHighLight: false,
      highLight: false,
    };
  });

  return {
    ...state,
    board: newBoard,
  };
}
