import { findIndexInBoard } from '../find-index-in-board';

export { getPositionsForRook };
function getPositionsForRook({ block, isWhite, board }) {
  const { position } = block;
  let positions = [];
  const x = position[0];
  const y = position[1];
  positions = [
    // Vertical direction
    ...rookVerticalPositions({ x, y, isWhite, board }),
    // Horizontal direction
    ...rookHorizontalPositions({ x, y, isWhite, board }),
  ];
  return positions;
}

function rookVerticalPositions({ x, y, isWhite, board }) {
  let newRookX = x;
  const positions = [];
  while (newRookX > 0) {
    newRookX--;
    const idx = findIndexInBoard(board, newRookX, y);
    if (!board[idx].piece) {
      positions.push([newRookX, y]);
    } else if (board[idx].piece.isWhite !== isWhite) {
      positions.push([newRookX, y]);
      newRookX = 0;
    } else {
      newRookX = 0;
    }
  }
  let newRookX2 = x;
  while (newRookX2 < 7) {
    newRookX2++;
    const idx = findIndexInBoard(board, newRookX2, y);
    if (!board[idx].piece) {
      positions.push([newRookX2, y]);
    } else if (board[idx].piece.isWhite !== isWhite) {
      positions.push([newRookX2, y]);
      newRookX2 = 7;
    } else {
      newRookX2 = 7;
    }
  }

  return positions;
}

function rookHorizontalPositions({ x, y, isWhite, board }) {
  let newRookY = y;
  const positions = [];
  while (newRookY > 0) {
    newRookY--;
    const idx = findIndexInBoard(board, x, newRookY);
    if (!board[idx].piece) {
      positions.push([x, newRookY]);
    } else if (board[idx].piece.isWhite !== isWhite) {
      positions.push([x, newRookY]);
      newRookY = 0;
    } else {
      newRookY = 0;
    }
  }
  let newRookY2 = y;
  while (newRookY2 < 7) {
    newRookY2++;
    const idx = findIndexInBoard(board, x, newRookY2);
    if (!board[idx].piece) {
      positions.push([x, newRookY2]);
    } else if (board[idx].piece.isWhite !== isWhite) {
      positions.push([x, newRookY2]);
      newRookY2 = 7;
    } else {
      newRookY2 = 7;
    }
  }

  return positions;
}
