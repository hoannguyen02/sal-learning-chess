import { findIndexInBoard } from '../find-index-in-board';

export { getPositionsForBishop };
/**
 * We have 4 cases for bishop
 * B1: x = x + 1, y = y - 1
 * B2: x = x - 1, y = y + 1
 * B3: x = x - 1, y = y - 1
 * B4: x = x + 1, y = y + 1
 */
function getPositionsForBishop({ block, playerName, board }) {
  const { position } = block;
  const x = position[0];
  const y = position[1];
  let positions = [
    ...bishopB1Positions({ board, playerName, x, y }),
    ...bishopB2Positions({ board, playerName, x, y }),
    ...bishopB3Positions({ board, playerName, x, y }),
    ...bishopB4Positions({ board, playerName, x, y }),
  ];
  return positions;
}

function bishopB4Positions({ x, y, playerName, board }) {
  const positions = [];
  let newX = x;
  let newY = y;
  while (newX < 7 && newX < 7) {
    newX++;
    newY++;
    const idx = findIndexInBoard({ board, x: newX, y: newY });
    if (idx === -1) {
      return positions;
    }
    if (!board[idx].piece) {
      positions.push([newX, newY]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newX, newY]);
      newX = 7;
      newY = 7;
    } else {
      newX = 7;
      newY = 7;
    }
  }
  return positions;
}

function bishopB3Positions({ x, y, playerName, board }) {
  const positions = [];
  let newX = x;
  let newY = y;
  while (newY > 0 && newX > 0) {
    newY--;
    newX--;
    const idx = findIndexInBoard({ board, x: newX, y: newY });
    if (idx === -1) {
      return positions;
    }
    if (!board[idx].piece) {
      positions.push([newX, newY]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newX, newY]);
      newX = 0;
      newY = 0;
    } else {
      newX = 0;
      newY = 0;
    }
  }
  return positions;
}

function bishopB2Positions({ x, y, playerName, board }) {
  const positions = [];
  let newX = x;
  let newY = y;
  while (y < 7 && x > 0) {
    newX--;
    newY++;
    const idx = findIndexInBoard({ board, x: newX, y: newY });
    if (idx === -1) {
      return positions;
    }
    if (!board[idx].piece) {
      positions.push([newX, newY]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newX, newY]);
      newX = 0;
      newY = 7;
    } else {
      newX = 0;
      newY = 7;
    }
  }
  return positions;
}

function bishopB1Positions({ x, y, playerName, board }) {
  const positions = [];
  let newX = x;
  let newY = y;
  while (x < 7 && y > 0) {
    newX++;
    newY--;
    const idx = findIndexInBoard({ board, x: newX, y: newY });
    if (idx === -1) {
      return positions;
    }
    if (!board[idx].piece) {
      positions.push([newX, newY]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newX, newY]);
      newX = 7;
      newY = 0;
    } else {
      newX = 7;
      newY = 0;
    }
  }
  return positions;
}
