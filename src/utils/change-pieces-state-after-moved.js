export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(state) {
  const { board, isWhite, isWhitePlayOnly } = state;
  const newBoard = board.map((block) => {
    const enabled = !isWhitePlayOnly
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
