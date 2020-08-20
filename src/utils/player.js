import { PlayerName, BLACK_PIECES, WHITE_PIECES } from '../constants';

export { initialPlayer };

function initialPlayer(playerName) {
  return {
    playerName,
    pieces: generatePiecesForPlayer(playerName),
  };
}

function generatePiecesForPlayer(playerName) {
  if (playerName === PlayerName.BLACK) {
    return BLACK_PIECES.map(({ position, type, line }) =>
      generatePiece({
        position,
        type,
        playerName,
        line,
        isWhite: false,
      })
    );
  }

  return WHITE_PIECES.map(({ position, type, line }) =>
    generatePiece({
      position,
      type,
      playerName,
      line,
      isWhite: true,
    })
  );
}

function generatePiece({ position, type, playerName, line, isWhite }) {
  return {
    position,
    type,
    playerName,
    line,
    isWhite,
  };
}
