import { compose } from './compose';
import { castlingMovePiece } from './castling-move-piece';
import { resetAvailablePositions } from './reset-available-positions';
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
    resetAvailablePositions,
    castlingMovePiece
  )(state);

export { handleCastlingMove };

function castlingMove(...fns) {
  return fns.reduce(compose);
}
