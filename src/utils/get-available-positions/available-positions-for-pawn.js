import { PieceType } from '../../constants';
export { getPositionsForPawn };

function getPositionsForPawn({ block, isWhiteNext, playerName, board }) {
  const { position, piece } = block;
  const blocks = [];
  // Move forward 1
  const forwardOneIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
  const forwardOnePosition = [forwardOneIndex, position[1]];
  if (isEmptyPieceBlock(board, forwardOnePosition)) {
    blocks.push(forwardOnePosition);
  }
  // Catch others
  const catchNeighbors = pawnCatchNeighbors(
    board,
    position,
    isWhiteNext,
    playerName
  );

  switch (piece.line) {
    case 1:
      const forwardTwoIndex = isWhiteNext ? position[0] - 2 : position[0] + 2;
      // Move forward 2
      const forwardTwoPosition = [forwardTwoIndex, position[1]];
      if (isEmptyPieceBlock(board, forwardTwoPosition)) {
        blocks.push(forwardTwoPosition);
      }
      return [...blocks, ...catchNeighbors];
    case 5:
      return [
        ...blocks,
        ...catchNeighbors,
        ...pawnCatchOtherPawnAtFifthLine(board, position, playerName),
      ];

    default:
      return [...blocks, ...catchNeighbors];
  }
}

function pawnCatchOtherPawnAtFifthLine(board, position, playerName) {
  const [x, y] = position;
  const neighbors = [
    [x, y - 1],
    [x, y + 1],
  ];
  return board
    .filter(({ piece }) => {
      return piece
        ? piece.playerName !== playerName &&
            piece.type === PieceType.PAWN &&
            piece.justMoved &&
            neighbors.filter(
              (n) => n[0] === piece.position[0] && n[1] === piece.position[1]
            ).length > 0
        : false;
    })
    .map((block) => block.position);
}

function pawnCatchNeighbors(board, position, isWhiteNext, playerName) {
  let neighbors = [];
  const iIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
  switch (position[1]) {
    case 0:
      neighbors.push([iIndex, 1]);
      break;
    case 7:
      neighbors.push([iIndex, 6]);
      break;

    default:
      neighbors.push([iIndex, position[1] - 1], [iIndex, position[1] + 1]);
      break;
  }

  return board
    .filter((block) => {
      return block.piece
        ? block.piece.playerName !== playerName &&
            neighbors.filter(
              (n) =>
                n[0] === block.piece.position[0] &&
                n[1] === block.piece.position[1]
            ).length > 0
        : false;
    })
    .map((block) => block.position);
}

function isEmptyPieceBlock(board, position) {
  const idx = board.findIndex(
    (block) =>
      block.position[0] === position[0] && block.position[1] === position[1]
  );
  return idx >= 0 ? !board[idx].piece : false;
}
