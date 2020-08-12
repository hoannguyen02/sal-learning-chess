import { PlayerName, BLACK_PIECES, WHITE_PIECES } from '../constants';

export { initialPlayer };

function initialPlayer(name) {
  return {
    name,
    pieces: generatePiecesForPlayer(name),
  };
}

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

function generatePiece(pos, type) {
  return {
    pos,
    type,
    move: function name(nextPos) {
      console.log(`${type} at ${pos[0][1]} moving to ${nextPos[0][1]}`);
    },
  };
}
