export { changePieceStateAfterMoved };
function changePieceStateAfterMoved(board, playerName) {
  const newBoard = [...board];
  return newBoard.map((block) => {
    const enabled = block.piece ? playerName === block.piece.playerName : false;
    return {
      ...block,
      disabled: !enabled,
    };
  });
}
