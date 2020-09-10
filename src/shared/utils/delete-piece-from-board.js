import { findIndexInBoard } from './find-index-in-board';

export { deletePieceFromBoard };

function deletePieceFromBoard(state) {
  const { board, updateModePopup } = state;
  const [x, y] = updateModePopup.block.position;
  const index = findIndexInBoard(board, x, y);
  const newBoard = [...board];
  newBoard[index].piece = null;
  return {
    ...state,
    board: newBoard,
  };
}
