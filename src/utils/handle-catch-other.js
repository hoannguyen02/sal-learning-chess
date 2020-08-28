import { compose } from './compose';
import { changePieceStateAfterMoved } from './change-pieces-state-after-moved';
import { movePiece } from './move-piece';
import {
  removePieceFromCurrentBlock,
  removePieceFromNextBlock,
} from './remove-piece-from-block';
import { updatePromotionForPawn } from './update-promotion-for-pawn';
/**
 * Move piece
 * Remove piece from current block
 * Reset available positions
 * Change pieces state after moved
 * Update promotion for pawn
 * @param {*} state
 */
const handleCatchOther = (state) =>
  catchPiece(
    updatePromotionForPawn,
    changePieceStateAfterMoved,
    removePieceFromCurrentBlock,
    movePiece,
    removePieceFromNextBlock
  )(state);

export { handleCatchOther };

function catchPiece(...fns) {
  return fns.reduce(compose);
}
