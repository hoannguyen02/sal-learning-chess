import { PieceType, CASTLING_POSITIONS } from '../constants';

export { isCastlingMove };

function isCastlingMove(currentBlock, block) {
  const { piece } = currentBlock;
  const { position } = block;

  return piece
    ? piece.type === PieceType.KING &&
        CASTLING_POSITIONS.filter(
          ([x, y]) => x === position[0] && y === position[1]
        ).length > 0
    : false;
}
