import { compose } from './compose';
import { resetHighlightBlocks } from './reset-highlight-blocks';
import { changePieceStateAfterMoved } from './change-pieces-state-after-moved';
import { movePiece } from './move-piece';
import { removePieceFromCurrentBlock } from './remove-piece-from-block';
import { updatePromotionForPawn } from './update-promotion-for-pawn';
/**
 * Move piece
 * Remove piece from current block
 * Reset available positions
 * Change pieces state after moved
 * Update promotion for pawn
 * @param {*} state
 */
const handleNormalMove = (state) =>
  normalMove(
    updatePromotionForPawn,
    changePieceStateAfterMoved,
    resetHighlightBlocks,
    removePieceFromCurrentBlock,
    movePiece
  )(state);

export { handleNormalMove };

function normalMove(...fns) {
  return fns.reduce(compose);
}
