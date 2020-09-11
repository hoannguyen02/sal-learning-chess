import { PieceType } from '../constants';
import { findIndexInBoard } from './find-index-in-board';

export { addPieceToBoard };

function addPieceToBoard(state, pieceType, isWhitePlayer) {
  const { board, updateModePopup } = state;
  const { block } = updateModePopup;
  const [x, y] = block.position;
  let piece;
  switch (pieceType) {
    case PieceType.ROOK:
      piece = generateRookPiece(x, y, isWhitePlayer);
      break;
    case PieceType.BISHOP:
      piece = generateBishopPiece(x, y, isWhitePlayer);
      break;
    case PieceType.QUEEN:
      piece = generateQueenPiece(x, y, isWhitePlayer);
      break;
    case PieceType.KING:
      piece = generateKingPiece(x, y, isWhitePlayer);
      break;
    case PieceType.KNIGHT:
      piece = generateKnightPiece(x, y, isWhitePlayer);
      break;
    case PieceType.PAWN:
      piece = generatePawnPiece(x, y, isWhitePlayer);
      break;

    default:
      break;
  }

  const index = findIndexInBoard(board, x, y);
  board[index].piece = piece;

  return {
    ...state,
    board,
  };
}

function generatePawnPiece(x, y, isWhitePlayer) {
  return {
    isWhite: isWhitePlayer,
    position: [x, y],
    line: 1, // it depends on x, y
    enPassant: false,
    type: PieceType.PAWN,
  };
}

function generateKnightPiece(x, y, isWhitePlayer) {
  return {
    isWhite: isWhitePlayer,
    position: [x, y],
    type: PieceType.KNIGHT,
  };
}

function generateKingPiece(x, y, isWhitePlayer) {
  return {
    isWhite: isWhitePlayer,
    position: [x, y],
    type: PieceType.KING,
    isMoved: true, // Can be improve this in case initial King
  };
}

function generateQueenPiece(x, y, isWhitePlayer) {
  return { isWhite: isWhitePlayer, position: [x, y], type: PieceType.QUEEN };
}

function generateBishopPiece(x, y, isWhitePlayer) {
  return { isWhite: isWhitePlayer, position: [x, y], type: PieceType.BISHOP };
}

function generateRookPiece(x, y, isWhitePlayer) {
  return {
    isWhite: isWhitePlayer,
    position: [x, y],
    type: PieceType.ROOK,
    isMoved: true, // Can be improve this in case initial Rook
  };
}
