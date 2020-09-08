import { findIndexInBoard } from './find-index-in-board';
import { CastlingYPosition, PieceType, CASTLING_POSITIONS } from '../constants';
export { resetHighlightBlocks };
// Reset available positions
function resetHighlightBlocks(state) {
  const { board, availablePositions, currentBlock } = state;
  let newBoard = [...board];
  availablePositions.forEach((position) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === position[0] && block.position[1] === position[1]
    );
    if (idx >= 0) {
      newBoard[idx].highLight = false;
      newBoard[idx].disabled = true;
      if (isCastling(currentBlock, position)) {
        newBoard = handleResetHighlightCastling(newBoard, position, idx);
      }
    }
  });
  return {
    ...state,
    board: newBoard,
  };
}

function handleResetHighlightCastling(newBoard, position) {
  const [x, y] = position;
  const newYRook = y === CastlingYPosition.SIX ? y + 1 : y - 2;
  const rookIdx = findIndexInBoard(newBoard, x, newYRook);
  newBoard[rookIdx].castlingHighLight = false;
  return newBoard;
}

function isCastling(currentBlock, position) {
  const { piece } = currentBlock;
  return piece
    ? piece.type === PieceType.KING &&
        CASTLING_POSITIONS.filter(
          ([x, y]) => x === position[0] && y === position[1]
        ).length > 0
    : false;
}
