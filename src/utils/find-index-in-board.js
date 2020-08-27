export { findIndexInBoard };

function findIndexInBoard(board, x, y) {
  return board.findIndex(
    ({ position }) => position[0] === x && position[1] === y
  );
}
