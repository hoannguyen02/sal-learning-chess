import { PieceType } from '../../constants';
import { getPositionsForBishop } from './available-positions-for-bishop';
import { getPositionsForKing } from './available-positions-for-king';
import { getPositionsForKnight } from './available-positions-for-knight';
import { getPositionsForPawn } from './available-positions-for-pawn';

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
    case PieceType.QUEEN:
      return [
        ...getPositionsForRook({ block, isWhiteNext, playerName, board }),
        ...getPositionsForBishop({ block, isWhiteNext, playerName, board }),
      ];
    case PieceType.KING:
      return getPositionsForKing({ block, isWhiteNext, playerName, board });
    case PieceType.KNIGHT:
      return getPositionsForKnight({ block, isWhiteNext, playerName, board });

    default:
      return [];
  }
}

function findIndexInBoard({ board, x, y }) {
  return board.findIndex((b) => b.position[0] === x && b.position[1] === y);
}

function getPositionsForRook({ block, playerName, board }) {
  const { position } = block;
  let positions = [];
  const x = position[0];
  const y = position[1];
  positions = [
    // Vertical direction
    ...rookVerticalPositions({ x, y, playerName, board }),
    // Horizontal direction
    ...rookHorizontalPositions({ x, y, playerName, board }),
  ];
  return positions;
}

function rookVerticalPositions({ x, y, playerName, board }) {
  let newRookX = x;
  const positions = [];
  while (newRookX > 0) {
    newRookX--;
    const idx = findIndexInBoard({ board, x: newRookX, y });
    if (!board[idx].piece) {
      positions.push([newRookX, y]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newRookX, y]);
      newRookX = 0;
    } else {
      newRookX = 0;
    }
  }
  let newRookX2 = x;
  while (newRookX2 < 7) {
    newRookX2++;
    const idx = findIndexInBoard({ board, x: newRookX2, y });
    if (!board[idx].piece) {
      positions.push([newRookX2, y]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([newRookX2, y]);
      newRookX2 = 7;
    } else {
      newRookX2 = 7;
    }
  }

  return positions;
}

function rookHorizontalPositions({ x, y, playerName, board }) {
  let newRookY = y;
  const positions = [];
  while (newRookY > 0) {
    newRookY--;
    const idx = findIndexInBoard({ board, x, y: newRookY });
    if (!board[idx].piece) {
      positions.push([x, newRookY]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([x, newRookY]);
      newRookY = 0;
    } else {
      newRookY = 0;
    }
  }
  let newRookY2 = y;
  while (newRookY2 < 7) {
    newRookY2++;
    const idx = findIndexInBoard({ board, x, y: newRookY2 });
    if (!board[idx].piece) {
      positions.push([x, newRookY2]);
    } else if (board[idx].piece.playerName !== playerName) {
      positions.push([x, newRookY2]);
      newRookY2 = 7;
    } else {
      newRookY2 = 7;
    }
  }

  return positions;
}
