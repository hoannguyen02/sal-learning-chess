export { copyBoardState };

function copyBoardState(state) {
  const { board } = state;
  return {
    ...state,
    oldBoard: board,
  };
}
