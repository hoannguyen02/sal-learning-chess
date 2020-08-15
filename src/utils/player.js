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
    return BLACK_PIECES.map(({ prevPosition, position, type, line }) =>
      generatePiece({
        prevPosition,
        position,
        type,
        playerName,
        line,
        isWhite: false,
      })
    );
  }

  return WHITE_PIECES.map(({ prevPosition, position, type, line }) =>
    generatePiece({
      prevPosition,
      position,
      type,
      playerName,
      line,
      isWhite: true,
    })
  );
}

function generatePiece({
  prevPosition,
  position,
  type,
  playerName,
  line,
  isWhite,
}) {
  return {
    prevPosition,
    position,
    type,
    playerName,
    line,
    isWhite,
    move: function name(nextPos) {
      console.log(`${type} at ${position[0][1]} moving to ${nextPos[0][1]}`);
    },
  };
}
