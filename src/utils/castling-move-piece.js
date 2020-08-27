import { CastlingYPosition } from '../constants/castling-positions';
import { findIndexInBoard } from './find-index-in-board';

export { castlingMovePiece };

function castlingMovePiece(board, currentBlock, newBlock) {
  let newBoard = [...board];
  const { position: currentKingPos, piece } = currentBlock;
  const { position: newKingPos } = newBlock;
  // Move king from current to new block
  newBoard = moveKingFromCurrentToNewBlock(newBoard, newKingPos, piece);
  // Remove king from current block
  newBoard = removePieceFromBlock(newBoard, currentKingPos);
  // Move rook from current to new block
  // Remove rook from current block
  const [curRookPos, newRookPos] = getRookPositions(newKingPos);
  newBoard = moveRookFromCurrentToNewBlock(newBoard, curRookPos, newRookPos);

  return newBoard;
}

function moveRookFromCurrentToNewBlock(board, curRookPos, newRookPos) {
  const curIndex = findIndexInBoard(board, curRookPos[0], curRookPos[1]);
  const newIndex = findIndexInBoard(board, newRookPos[0], newRookPos[1]);
  board[newIndex].piece = board[curIndex].piece;
  board[newIndex].piece.position = newRookPos;
  board[newIndex].piece.isMoved = true;
  board[curIndex].piece = null;
  return board;
}

function getRookPositions(position) {
  let curRookYIndex;
  let newRookYIndex;
  if (position[1] === CastlingYPosition.SIX) {
    curRookYIndex = 7;
    newRookYIndex = CastlingYPosition.SIX - 1;
  } else {
    newRookYIndex = CastlingYPosition.TWO + 1;
    curRookYIndex = 0;
  }
  return [
    [position[0], curRookYIndex],
    [position[0], newRookYIndex],
  ];
}

function moveKingFromCurrentToNewBlock(board, position, piece) {
  const index = findIndexInBoard(board, position[0], position[1]);
  board[index].piece = piece;
  board[index].piece.position = position;
  board[index].piece.isMoved = true;
  return board;
}

function removePieceFromBlock(board, position) {
  const index = findIndexInBoard(board, position[0], position[1]);
  board[index].piece = null;
  return board;
}
