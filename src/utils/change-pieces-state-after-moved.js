export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(state) {
  const { board, isWhite, whitePlayOnly } = state;
  const newBoard = board.map((block) => {
    const enabled = !whitePlayOnly
      ? block.piece && block.piece.isWhite === !isWhite
      : block.piece && block.piece.isWhite === isWhite;
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
