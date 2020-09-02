import { findIndexInBoard } from './find-index-in-board';

export {
  removePieceFromCurrentBlock,
  removePieceFromNextBlock,
  removePieceFromEnPassantBlock,
};

function removePieceFromEnPassantBlock(state) {
  const { board, block, isWhiteNext } = state;
  const [x, y] = block.position;
  const enX = isWhiteNext ? x + 1 : x - 1;
  const index = findIndexInBoard(board, enX, y);
  board[index].piece = null;
  return {
    ...state,
    board,
  };
}

function removePieceFromCurrentBlock(state) {
  const { board, currentBlock } = state;
  const currentIndex = board.findIndex(
    (b) =>
      b.position[0] === currentBlock.position[0] &&
      b.position[1] === currentBlock.position[1]
  );
  board[currentIndex].piece = null;
  return {
    ...state,
    board,
  };
}

function removePieceFromNextBlock(state) {
  const { board, block } = state;
  const currentIndex = board.findIndex(
    (b) =>
      b.position[0] === block.position[0] && b.position[1] === block.position[1]
  );
  board[currentIndex].piece = null;
  return {
    ...state,
    board,
  };
}
