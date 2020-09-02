import { compose } from './compose';
import { changePieceStateAfterMoved } from './change-pieces-state-after-moved';
import { movePiece } from './move-piece';
import {
  removePieceFromCurrentBlock,
  removePieceFromEnPassantBlock,
} from './remove-piece-from-block';
/**
 * Remove piece in block that contain en-passant position
 * Move piece in current block to new block
 * Remove piece from current block
 * Change pieces state after moved
 * @param {*} state
 */
const handleEnPassantCapture = (state) =>
  enPassantCapture(
    changePieceStateAfterMoved,
    removePieceFromCurrentBlock,
    movePiece,
    removePieceFromEnPassantBlock
  )(state);

export { handleEnPassantCapture };

function enPassantCapture(...fns) {
  return fns.reduce(compose);
}
