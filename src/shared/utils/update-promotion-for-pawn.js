import { PieceType } from '../constants';

export { updatePromotionForPawn };
function updatePromotionForPawn(state) {
  let { piece } = state;
  if (piece && piece.type === PieceType.PAWN && piece.line === 8) {
    return {
      ...state,
      promotionForPawn: {
        piece,
        open: true,
      },
    };
  }
  return {
    ...state,
    movesCount: state.movesCount + 1,
  };
}
