export { findIndexInBoard };

function findIndexInBoard({ board, x, y }) {
  return board.findIndex((b) => b.position[0] === x && b.position[1] === y);
}
