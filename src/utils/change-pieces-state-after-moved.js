export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(board, isWhite) {
  return board.map((block) => {
    const enabled = block.piece ? isWhite === block.piece.isWhite : false;
    return {
      ...block,
      disabled: !enabled,
      catchHighLight: false,
      highLight: false,
    };
  });
}
