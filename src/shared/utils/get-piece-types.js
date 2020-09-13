import { PieceType, PlayerName } from '../constants';

export { getPieceTypes };
function getPieceTypes(board, playerName) {
  const isWhite = PlayerName.WHITE === playerName;
  const defaultTypes = [
    PieceType.ROOK,
    PieceType.BISHOP,
    PieceType.QUEEN,
    PieceType.KNIGHT,
    PieceType.PAWN,
  ];
  !isKingInBoard(board, isWhite) && defaultTypes.push(PieceType.KING);
  return defaultTypes;
}

function isKingInBoard(board, isWhite) {
  return (
    board.filter(
      (block) =>
        block.piece &&
        block.piece.isWhite === isWhite &&
        block.piece.type === PieceType.KING
    ).length > 0
  );
}
