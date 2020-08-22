import { findIndexInBoard } from '../find-index-in-board';

export { getPositionsForKnight };
/**
 * We have 8 cases for Knight
 * Top: Same x - 2 => (x = x - 2, y = y - 1), (x = x - 2, y = y + 1)
 * Right: Same y + 2 => (x = x - 1, y = y + 2), (x = x + 1, y = y + 2)
 * Bottom: Same x + 2 => (x = x + 2, y = y - 1), (x = x + 2, y = y + 1)
 * Left:  Same y - 2 => (x = x - 1, y = y - 2), (x = x + 1, y = y - 2)
 */
function getPositionsForKnight({ block, playerName, board }) {
  const { position } = block;
  const x = position[0];
  const y = position[1];
  const availablePositions = [];
  const allPositions = [
    ...knightTopPositions(x, y),
    ...knightRightPositions(x, y),
    ...knightBottomPositions(x, y),
    ...knightLeftPositions(x, y),
  ];

  if (allPositions.length > 0) {
    allPositions.forEach((p) => {
      const idx = findIndexInBoard({ board, x: p[0], y: p[1] });
      if (
        idx >= 0 &&
        (!board[idx].piece || board[idx].piece.playerName !== playerName)
      ) {
        availablePositions.push([p[0], p[1]]);
      }
    });
  }
  return availablePositions;
}

function knightTopPositions(x, y) {
  const positions = [];
  x - 2 >= 0 && y - 1 >= 0 && positions.push([x - 2, y - 1]);
  x - 2 >= 0 && y + 1 <= 7 && positions.push([x - 2, y + 1]);
  return positions;
}

function knightBottomPositions(x, y) {
  const positions = [];
  x + 2 <= 7 && y - 1 >= 0 && positions.push([x + 2, y - 1]);
  x + 2 <= 7 && y + 1 <= 7 && positions.push([x + 2, y + 1]);
  return positions;
}

function knightRightPositions(x, y) {
  const positions = [];
  x - 1 >= 0 && y + 2 <= 7 && positions.push([x - 1, y + 2]);
  x + 1 <= 7 && y + 2 <= 7 && positions.push([x + 1, y + 2]);
  return positions;
}

function knightLeftPositions(x, y) {
  const positions = [];
  x - 1 >= 0 && y - 2 >= 0 && positions.push([x - 1, y - 2]);
  x + 1 <= 7 && y - 2 >= 0 && positions.push([x + 1, y - 2]);
  return positions;
}
