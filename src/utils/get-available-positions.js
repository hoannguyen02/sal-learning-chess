import { PieceType } from '../constants';

// Get available blocks to move and which ones can catch then hight light those
export function getAvailablePositions({ block, board, isWhiteNext, player }) {
  switch (block.piece.type) {
    case PieceType.PAWN:
      return getBlocksForPawn({ block, isWhiteNext, player, board });

    default:
      return [];
  }
}

function getBlocksForPawn({ block, isWhiteNext, player, board }) {
  const { position, piece } = block;
  const blocks = [];
  switch (piece.line) {
    case 1:
      // Move forward 1 or 2 blocks
      const forwardOneIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
      const forwardTwoIndex = isWhiteNext ? position[0] - 2 : position[0] + 2;
      blocks.push(
        [forwardOneIndex, position[1]],
        [forwardTwoIndex, position[1]]
      );
      const catchNeighbors = pawnCatchNeighbors(
        board,
        position,
        isWhiteNext,
        player
      );
      // Catch others
      return [...blocks, ...catchNeighbors];
    case 5:
      // Think more later in case just other just start move pawn or not
      break;

    default:
      break;
  }
}

function pawnCatchNeighbors(board, position, isWhiteNext, player) {
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
      neighbors.push([
        [iIndex, position[1] - 1],
        [iIndex, position[1] + 1],
      ]);
      break;
  }
  return board.filter(
    (block) =>
      block.piece &&
      block.piece.playerName !== player.playerName &&
      neighbors.findIndex(
        (n) =>
          n[0] === block.piece.position[0] && n[1] === block.piece.position[1]
      ) >= 0
  );
}
