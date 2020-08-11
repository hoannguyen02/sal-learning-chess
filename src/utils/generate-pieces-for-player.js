import { PlayerName, BLACK_PIECES, WHITE_PIECES } from '../constants';
import { generatePiece } from './generate-piece';

export { generatePiecesForPlayer };

function generatePiecesForPlayer(name) {
  if (name === PlayerName.BLACK) {
    return BLACK_PIECES.map(({ position, type }) =>
      generatePiece(position, type)
    );
  }

  return WHITE_PIECES.map(({ position, type }) =>
    generatePiece(position, type)
  );
}
