import { findIndexInBoard } from '../find-index-in-board';
import {
  castlingKingSidePositions,
  castlingQueenSidePositions,
} from './available-positions-castling';

export { getPositionsForKing };
/**
 * We have 8 cases for King and castling is special one
 * B1: (x, y = y - 1), (x, y = y + 1)
 * B2: (x = x - 1, y ), (x = x + 1, y)
 * B3: (x = x - 1, y = y - 1), (x = x + 1, y = y + 1)
 * B4: (x = x - 1, y = y + 1), (x = x + 1, y = y - 1)
 * Castling
 */
function getPositionsForKing({ block, isWhiteNext, isWhite, board }) {
  const { position } = block;
  const x = position[0];
  const y = position[1];
  const availablePositions = [];
  const allPositions = [
    ...kingB1Positions(x, y),
    ...kingB2Positions(x, y),
    ...kingB3Positions(x, y),
    ...kingB4Positions(x, y),
  ];

  if (allPositions.length > 0) {
    allPositions.forEach((p) => {
      const idx = findIndexInBoard(board, p[0], p[1]);
      if (
        idx >= 0 &&
        (!board[idx].piece || board[idx].piece.isWhite !== isWhite)
      ) {
        availablePositions.push([p[0], p[1]]);
      }
    });
  }
  return availablePositions.concat([
    ...castlingKingSidePositions({ block, isWhite, isWhiteNext, board }),
    ...castlingQueenSidePositions({
      block,
      isWhite,
      isWhiteNext,
      board,
    }),
  ]);
}

function kingB4Positions(x, y) {
  const positions = [];
  x - 1 > 0 && y + 1 < 7 && positions.push([x - 1, y + 1]);
  x + 1 < 7 && y - 1 > 0 && positions.push([x + 1, y - 1]);
  return positions;
}

function kingB3Positions(x, y) {
  const positions = [];
  x - 1 > 0 && y - 1 > 0 && positions.push([x - 1, y - 1]);
  x + 1 < 7 && y + 1 < 7 && positions.push([x + 1, y + 1]);
  return positions;
}

function kingB2Positions(x, y) {
  const positions = [];
  x - 1 > 0 && positions.push([x - 1, y]);
  x + 1 < 7 && positions.push([x + 1, y]);
  return positions;
}

function kingB1Positions(x, y) {
  const positions = [];
  y - 1 > 0 && positions.push([x, y - 1]);
  y + 1 < 7 && positions.push([x, y + 1]);
  return positions;
}
