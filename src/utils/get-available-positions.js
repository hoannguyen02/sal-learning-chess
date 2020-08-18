import { PieceType } from '../constants';

// Get available blocks to move and which ones can catch then hight light those
export function getAvailablePositions({
  block,
  board,
  isWhiteNext,
  playerName,
}) {
  switch (block.piece.type) {
    case PieceType.PAWN:
      return getPositionsForPawn({ block, isWhiteNext, playerName, board });
    case PieceType.ROOK:
      return getPositionsForRook({ block, isWhiteNext, playerName, board });
    case PieceType.BISHOP:
      return getPositionsForBishop({ block, isWhiteNext, playerName, board });

    default:
      return [];
  }
}

function isEmptyPieceBlock(board, position) {
  const idx = board.findIndex(
    (block) =>
      block.position[0] === position[0] && block.position[1] === position[1]
  );
  return idx >= 0 ? !board[idx].piece : false;
}

function findPositionIndexInBoard({ board, x, y }) {
  return board.findIndex((b) => b.position[0] === x && b.position[1] === y);
}

/**
 * We have 4 cases for bishop
 * B1: x = x + 1, y = y - 1
 * B2: x = x - 1, y = y + 1
 * B3: x = x - 1, y = y - 1
 * B4: x = x + 1, y = y + 1
 */
function getPositionsForBishop({ block, isWhiteNext, playerName, board }) {
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
    const idx = findPositionIndexInBoard({ board, x: newX, y: newY });
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
    const idx = findPositionIndexInBoard({ board, x: newX, y: newY });
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
    const idx = findPositionIndexInBoard({ board, x: newX, y: newY });
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
    const idx = findPositionIndexInBoard({ board, x: newX, y: newY });
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

function getPositionsForRook({ block, playerName, board }) {
  const { position } = block;
  let positions = [];
  positions = [
    // Vertical direction
    ...rookMovesStraightLinePositions({
      x: position[0],
      y: position[1],
      verticalDirection: true,
      playerName,
      board,
    }),
    // Horizontal direction
    ...rookMovesStraightLinePositions({
      x: position[0],
      y: position[1],
      verticalDirection: false,
      playerName,
      board,
    }),
  ];
  return positions;
}

function rookMovesStraightLinePositions({
  playerName,
  board,
  verticalDirection,
  x,
  y,
}) {
  let firstIndex = verticalDirection ? x : y;
  const positions = [];
  while (firstIndex > 0) {
    firstIndex--;
    const idx = findPositionIndexInBoard(
      verticalDirection
        ? { board, x: firstIndex, y }
        : { board, x, y: firstIndex }
    );
    if (!board[idx].piece) {
      positions.push(verticalDirection ? [firstIndex, y] : [x, firstIndex]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push(verticalDirection ? [firstIndex, y] : [x, firstIndex]);
      firstIndex = 0;
    } else {
      firstIndex = 0;
    }
  }
  let secondIndex = verticalDirection ? x : y;
  while (secondIndex < 7) {
    secondIndex++;
    const idx = findPositionIndexInBoard(
      verticalDirection
        ? { board, x: secondIndex, y }
        : { board, x, y: secondIndex }
    );
    if (!board[idx].piece) {
      positions.push(verticalDirection ? [secondIndex, y] : [x, secondIndex]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push(verticalDirection ? [secondIndex, y] : [x, secondIndex]);
      secondIndex = 7;
    } else {
      secondIndex = 7;
    }
  }

  return positions;
}

function getPositionsForPawn({ block, isWhiteNext, playerName, board }) {
  const { position, piece } = block;
  const blocks = [];
  let catchNeighbors = [];
  // Move forward 1
  const forwardOneIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
  const forwardOnePosition = [forwardOneIndex, position[1]];
  if (isEmptyPieceBlock(board, forwardOnePosition)) {
    blocks.push(forwardOnePosition);
  }
  switch (piece.line) {
    case 1:
      const forwardTwoIndex = isWhiteNext ? position[0] - 2 : position[0] + 2;
      // Move forward 2
      const forwardTwoPosition = [forwardTwoIndex, position[1]];
      if (isEmptyPieceBlock(board, forwardTwoPosition)) {
        blocks.push(forwardTwoPosition);
      }
      // Catch others
      catchNeighbors = pawnCatchNeighbors(
        board,
        position,
        isWhiteNext,
        playerName
      );
      return [...blocks, ...catchNeighbors];
    case 5:
      // Think more later in case just other just start move pawn or not
      break;

    default:
      // Catch others
      catchNeighbors = pawnCatchNeighbors(
        board,
        position,
        isWhiteNext,
        playerName
      );
      return [...blocks, ...catchNeighbors];
  }
}

function pawnCatchNeighbors(board, position, isWhiteNext, playerName) {
  let neighbors = [];
  const iIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
  switch (position[1]) {
    case 0:
      neighbors.push([iIndex, 1]);
      break;
    case 7:
      neighbors.push([iIndex, 6]);
      break;

    default:
      neighbors.push([iIndex, position[1] - 1], [iIndex, position[1] + 1]);
      break;
  }

  return board
    .filter((block) => {
      return block.piece
        ? block.piece.playerName !== playerName &&
            neighbors.filter(
              (n) =>
                n[0] === block.piece.position[0] &&
                n[1] === block.piece.position[1]
            ).length > 0
        : false;
    })
    .map((block) => block.position);
}
