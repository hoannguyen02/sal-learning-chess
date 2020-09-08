import { PieceType, CASTLING_POSITIONS, CastlingYPosition } from '../constants';
import { findIndexInBoard } from './find-index-in-board';
export { highLightBlocks };
// Hight light blocks that user can move
function highLightBlocks(state) {
  const { board, availablePositions, block } = state;
  let newBoard = [...board];
  availablePositions.forEach((position) => {
    const idx = newBoard.findIndex(
      (block) =>
        block.position[0] === position[0] && block.position[1] === position[1]
    );
    if (idx >= 0) {
      if (isCastling(block, position)) {
        newBoard = handleHighlightCastling(newBoard, idx, position);
      } else {
        newBoard[idx].highLight = true;
        newBoard[idx].catchHighLight = newBoard[idx].piece !== null;
        newBoard[idx].disabled = false;
      }
    }
  });
  return {
    ...state,
    board: newBoard,
  };
}

// Highlight Rook for user click to castling
function handleHighlightCastling(newBoard, index, position) {
  newBoard[index].highLight = true;
  newBoard[index].disabled = true;
  const [x, y] = position;
  const newYRook = y === CastlingYPosition.SIX ? y + 1 : y - 2;
  const rookIdx = findIndexInBoard(newBoard, x, newYRook);
  newBoard[rookIdx].castlingHighLight = true;
  return newBoard;
}

function isCastling(block, position) {
  const { piece } = block;
  return piece
    ? piece.type === PieceType.KING &&
        CASTLING_POSITIONS.filter(
          ([x, y]) => x === position[0] && y === position[1]
        ).length > 0
    : false;
}
