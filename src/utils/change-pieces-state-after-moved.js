export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(board, playerName) {
  return board.map((block) => {
    const enabled = block.piece ? playerName === block.piece.playerName : false;
    return {
      ...block,
      disabled: !enabled,
      catchHighLight: false,
      highLight: false,
    };
  });
}
