/* eslint-disable no-unused-vars */
import { findIndexInBoard } from '../find-index-in-board';
import { PieceType, CastlingYPosition } from '../../constants';

// The King must not have moved previously in the game.
// The Rook that is castling must not have moved previously in the game.
// No piece must be located on a square in between the King and Rook that are castling.
// The King must not be in check.
// The King and Rook can't be moved to a square that is attacked.
export { castlingKingSidePositions, castlingQueenSidePositions };

// King side
function castlingKingSidePositions({ block, isWhiteNext, isWhite, board }) {
  const { position, piece } = block;
  const [x, y] = position;
  // Make sure it's not moved yet
  if (piece.isMoved) {
    return [];
  }
  // Make sure there is no pieces between King and Rook
  if (
    hasPieceBetweenKingAndRook(board, [
      [x, y + 1],
      [x, y + 2],
    ])
  ) {
    return [];
  }
  // Make sure no check for King before move
  if (isKingInCheckCastling({ board, x, y, isWhiteNext, isWhite })) {
    return [];
  }
  // Make sure Rook still there and didn't move yet
  if (!isRookValidForCastling({ board, x, y: y + 3 })) {
    return [];
  }
  // Make sure no check for King after moved
  if (
    isKingInCheckCastling({ board, x, y: y + 2, isWhiteNext, isWhite }) ||
    isRookInCheckCastling({ board, x, y: y + 1, isWhiteNext, isWhite })
  ) {
    return [];
  }
  // Make sure Rook on the right side
  return [[x, y + 2]];
}

// Queen side
function castlingQueenSidePositions({ block, board, isWhiteNext, isWhite }) {
  const { position, piece } = block;
  const [x, y] = position;
  // Make sure it's not moved yet
  if (piece.isMoved) {
    return [];
  }
  // Make sure there is no pieces between King and Rook
  if (
    hasPieceBetweenKingAndRook(board, [
      [x, y - 1],
      [x, y - 2],
      [x, y - 3],
    ])
  ) {
    return [];
  }
  // Make sure no check for King before move
  if (isKingInCheckCastling({ board, x, y, isWhiteNext, isWhite })) {
    return [];
  }
  // Make sure Rook still there and didn't move yet
  if (!isRookValidForCastling({ board, x, y: y - 4 })) {
    return [];
  }
  // Make sure no check for King after moved
  if (
    isKingInCheckCastling({ board, x, y: y - 2, isWhiteNext, isWhite }) ||
    isRookInCheckCastling({ board, x, y: y - 1, isWhiteNext, isWhite })
  ) {
    return [];
  }

  // Make sure Rook on the right side
  return [[x, y - 2]];
}

/**
 * We need to check these directions
 * Front
 * Diagonal
 * Knight nearest
 * @param {*} param0
 */
function isKingInCheckCastling({ board, x, y, isWhiteNext, isWhite }) {
  return (
    isFrontInCheckCastling({ board, x, y, isWhiteNext, isWhite }) ||
    isDiagonalInCheckCastling({ board, x, y, isWhiteNext, isWhite }) ||
    isKnightNearestInCheckCastling({ board, x, y, isWhiteNext, isWhite })
  );
}

/**
 * We need to check these directions
 * Front
 * Diagonal
 * Knight nearest
 * @param {*} param0
 */
function isRookInCheckCastling({ board, x, y, isWhiteNext, isWhite }) {
  return (
    isFrontInCheckCastling({ board, x, y, isWhiteNext, isWhite }) ||
    isDiagonalInCheckCastling({ board, x, y, isWhiteNext, isWhite }) ||
    isKnightNearestInCheckCastling({ board, x, y, isWhiteNext, isWhite })
  );
}

function isKingInCheckWithTypes({ board, x, y, isWhite, types }) {
  const idx = findIndexInBoard(board, x, y);
  if (idx === -1) {
    return [true, false];
  }
  const { piece } = board[idx];
  // Let continue if there is no piece
  if (!piece) {
    return [false, false];
  }
  // Let exit if there is a piece with same player name or other piece with type not Rook or Bishop
  if (piece.isWhite === isWhite || !types.includes(piece.type)) {
    return [true, false];
  }

  return [true, true];
}

function isFrontInCheckCastling({ board, x, y, isWhiteNext, isWhite }) {
  let newX = x;
  let isInCheck = false;
  const types = [PieceType.QUEEN, PieceType.ROOK];
  if (isWhiteNext) {
    while (newX > 0) {
      newX--;
      const [exit, inCheck] = isKingInCheckWithTypes({
        board,
        x: newX,
        y,
        isWhite,
        types,
      });
      if (inCheck) isInCheck = true;
      if (inCheck || exit) {
        newX = 0;
      }
    }
  } else {
    while (newX < 7) {
      newX++;
      const [exit, inCheck] = isKingInCheckWithTypes({
        board,
        x: newX,
        y,
        isWhite,
        types,
      });
      if (inCheck) isInCheck = true;
      if (inCheck || exit) {
        newX = 7;
      }
    }
  }

  return isInCheck;
}

function isDiagonalInCheckCastling({ board, x, y, isWhiteNext, isWhite }) {
  if (isWhiteNext) {
    if (y === CastlingYPosition.SIX) {
      const [_, nearestInCheck] = isKingInCheckWithTypes({
        board,
        x: x - 1,
        y: y + 1,
        isWhite,
        types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
      });
      return (
        nearestInCheck || isDiagonalDownInCheck({ board, x, y, isWhite }) // Right side first then left side
      );
    } else {
      return (
        isDiagonalDownInCheck({ board, x, y, isWhite }) || // Left side
        isDiagonalTwoWayInCheck({ board, x, y, isWhite, xMinus: true }) // Right side
      );
    }
  } else {
    if (y === CastlingYPosition.SIX) {
      const [_, nearestInCheck] = isKingInCheckWithTypes({
        board,
        x: x + 1,
        y: y + 1,
        isWhite,
        types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
      });
      return (
        nearestInCheck || // Left side
        isDiagonalTwoWayInCheck({ board, x, y, isWhite, xMinus: false }) // Right side
      );
    } else {
      return (
        isDiagonalTwoWayInCheck({ board, x, y, isWhite, xMinus: false }) || // Right side
        isDiagonalUpInCheck({ board, x, y, isWhite }) // Left side
      );
    }
  }
}

function isDiagonalTwoWayInCheck({ board, x, y, isWhite, xMinus }) {
  let newX = x;
  let newY = y;
  let isInCheck = false;
  const types = [PieceType.BISHOP, PieceType.QUEEN];
  if (xMinus) {
    newX--;
    newY++;
    // Check Pawn, Bishop, Queen nearest
    const [_, inCheckMinus] = isKingInCheckWithTypes({
      board,
      x: newX,
      y: newY,
      isWhite,
      types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
    });
    if (inCheckMinus) {
      return true;
    }
    while (newX > 0 && newY < 7) {
      newX--;
      newY++;
      const [exit, inCheck] = isKingInCheckWithTypes({
        board,
        x: newX,
        y: newY,
        isWhite,
        types,
      });
      if (inCheck) isInCheck = true;
      if (inCheck || exit) {
        newX = 0;
        newY = 7;
      }
    }
  } else {
    newX++;
    newY--;
    // Check Pawn, Bishop, Queen nearest
    const [_, inCheckPlus] = isKingInCheckWithTypes({
      board,
      x: newX,
      y: newY,
      isWhite,
      types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
    });
    if (inCheckPlus) {
      return true;
    }
    while (newX < 7 && newY > 0) {
      newX++;
      newY--;
      const [exit, inCheck] = isKingInCheckWithTypes({
        board,
        x: newX,
        y: newY,
        isWhite,
        types,
      });
      if (inCheck) isInCheck = true;
      if (inCheck || exit) {
        newX = 7;
        newY = 0;
      }
    }
  }
  return isInCheck;
}

function isDiagonalUpInCheck({ board, x, y, isWhite }) {
  // Check Pawn, Bishop, Queen nearest
  const [_, nearestInCheck] = isKingInCheckWithTypes({
    board,
    x: x + 1,
    y: y + 1,
    isWhite,
    types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
  });
  if (nearestInCheck) {
    return true;
  }
  // Check Bishop or Queen
  let newX = x;
  let newY = y;
  let isInCheck = false;
  const types = [PieceType.BISHOP, PieceType.QUEEN];
  while (newX < 7 && newY < 7) {
    newX++;
    newY++;
    const [exit, inCheck] = isKingInCheckWithTypes({
      board,
      x: newX,
      y: newY,
      isWhite,
      types,
    });
    if (inCheck) isInCheck = true;
    if (inCheck || exit) {
      newX = 7;
      newY = 7;
    }
  }
  return isInCheck;
}

function isDiagonalDownInCheck({ board, x, y, isWhite }) {
  // Check Pawn, Bishop, Queen nearest
  const [_, nearestInCheck] = isKingInCheckWithTypes({
    board,
    x: x - 1,
    y: y - 1,
    isWhite,
    types: [PieceType.PAWN, PieceType.QUEEN, PieceType.BISHOP],
  });
  if (nearestInCheck) {
    return true;
  }
  // Check Bishop or Queen
  let newX = x;
  let newY = y;
  let isInCheck = false;
  const types = [PieceType.BISHOP, PieceType.QUEEN];
  while (newX > 0 && newY > 0) {
    newX--;
    newY--;
    const [exit, inCheck] = isKingInCheckWithTypes({
      board,
      x: newX,
      y: newY,
      isWhite,
      types,
    });
    if (inCheck) isInCheck = true;
    if (inCheck || exit) {
      newX = 0;
      newY = 0;
    }
  }
  return isInCheck;
}

function isKnightNearestInCheckCastling({ board, x, y, isWhiteNext, isWhite }) {
  const isKingInCheckByKnight = ({ board, positions, isWhite }) => {
    return (
      board.filter(({ piece }) => {
        return piece
          ? piece.isWhite !== isWhite &&
              piece.type === PieceType.KNIGHT &&
              positions.filter(
                ([x, y]) => x === piece.position[0] && y === piece.position[1]
              ).length > 0
          : false;
      }).length > 0
    );
  };

  const positions = isWhiteNext
    ? [
        [x - 2, y - 1],
        [x - 2, y + 1],
        [x - 1, y - 2],
      ]
    : [
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y - 2],
      ];

  return isKingInCheckByKnight({ board, positions, isWhite });
}

function isRookValidForCastling({ board, x, y }) {
  const idx = findIndexInBoard(board, x, y);
  if (
    idx >= 0 &&
    board[idx].piece &&
    board[idx].piece.type === PieceType.ROOK &&
    !board[idx].piece.isMoved
  ) {
    return true;
  }

  return false;
}

function hasPieceBetweenKingAndRook(board, positions) {
  return (
    board.filter(({ piece }) => {
      return piece
        ? positions.filter(
            ([x, y]) =>
              x === piece.position[0] &&
              y === piece.position[1] &&
              piece !== null
          ).length > 0
        : false;
    }).length > 0
  );
}
