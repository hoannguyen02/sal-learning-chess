import { compose } from './compose';
import { castlingMovePiece } from './castling-move-piece';
import { resetHighlightBlocks } from './reset-highlight-blocks';
import { changePieceStateAfterMoved } from './change-pieces-state-after-moved';

/**
 * Move piece
 * Reset available positions, also current block
 * Change pieces state after moved
 * @param {*} state
 */
const handleCastlingMove = (state) =>
  castlingMove(
    changePieceStateAfterMoved,
    resetHighlightBlocks,
    castlingMovePiece
  )(state);

export { handleCastlingMove };

function castlingMove(...fns) {
  return fns.reduce(compose);
}
