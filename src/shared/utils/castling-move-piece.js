import { findIndexInBoard } from './find-index-in-board';

export { castlingMovePiece };

function castlingMovePiece(state) {
  const { board, currentBlock: kingBlock, block: rookBlock } = state;
  let newBoard = [...board];
  const { position: currentKingPos, piece } = kingBlock;
  const { position: currentRookPos } = rookBlock;
  // Move king from current to new block
  newBoard = moveKingFromCurrentToNewBlock(newBoard, currentRookPos, piece);
  // Remove king from current block
  newBoard = removePieceFromCurrentBlock(newBoard, currentKingPos);
  // Move rook from current to new block
  // Remove rook from current block
  const newRookPos = getRookPositions(currentRookPos);
  newBoard = moveRookFromCurrentToNewBlock(
    newBoard,
    currentRookPos,
    newRookPos
  );

  return {
    ...state,
    board: newBoard,
    isCastlingMove: false,
  };
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
  const [x, y] = position;
  const newKingY = y === 0 ? 3 : 5;
  return [x, newKingY];
}

function getNewKingPosition(position) {
  const [x, y] = position;
  const newKingY = y === 0 ? 2 : 6;
  return [x, newKingY];
}

function moveKingFromCurrentToNewBlock(board, curRookPos, piece) {
  const [x, y] = getNewKingPosition(curRookPos);
  const index = findIndexInBoard(board, x, y);
  board[index].piece = piece;
  board[index].piece.position = [x, y];
  board[index].piece.isMoved = true;
  return board;
}

function removePieceFromCurrentBlock(board, position) {
  const index = findIndexInBoard(board, position[0], position[1]);
  board[index].piece = null;
  return board;
}
