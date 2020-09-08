import { PieceType } from '../../constants';
import { getPositionsForBishop } from './available-positions-for-bishop';
import { getPositionsForKing } from './available-positions-for-king';
import { getPositionsForKnight } from './available-positions-for-knight';
import { getPositionsForPawn } from './available-positions-for-pawn';
import { getPositionsForRook } from './available-positions-for-rook';

// Get available blocks to move and which ones can capture then hight light those
export function getAvailablePositions(state) {
  const { block, board, isWhiteNext, isWhite } = state;
  let availablePositions = [];
  switch (block.piece.type) {
    case PieceType.PAWN:
      availablePositions = getPositionsForPawn({
        block,
        isWhiteNext,
        isWhite,
        board,
      });
      break;
    case PieceType.ROOK:
      availablePositions = getPositionsForRook({
        block,
        isWhiteNext,
        isWhite,
        board,
      });
      break;
    case PieceType.BISHOP:
      availablePositions = getPositionsForBishop({
        block,
        isWhiteNext,
        isWhite,
        board,
      });
      break;
    case PieceType.QUEEN:
      availablePositions = [
        ...getPositionsForRook({ block, isWhiteNext, isWhite, board }),
        ...getPositionsForBishop({ block, isWhiteNext, isWhite, board }),
      ];
      break;
    case PieceType.KING:
      availablePositions = getPositionsForKing({
        block,
        isWhiteNext,
        isWhite,
        board,
      });
      break;
    case PieceType.KNIGHT:
      availablePositions = getPositionsForKnight({
        block,
        isWhiteNext,
        isWhite,
        board,
      });
      break;

    default:
      availablePositions = [];
      break;
  }

  return {
    ...state,
    availablePositions,
  };
}
