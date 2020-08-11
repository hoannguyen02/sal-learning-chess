import { generatePiecesForPlayer } from './generate-pieces-for-player';

export function initialPlayer(name) {
  return {
    name,
    pieces: generatePiecesForPlayer(name),
  };
}
