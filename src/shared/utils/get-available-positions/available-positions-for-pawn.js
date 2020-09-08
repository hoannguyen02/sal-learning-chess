import { isEnPassant } from '../is-en-passant';

export { getPositionsForPawn };

function getPositionsForPawn({ block, isWhiteNext, isWhite, board }) {
  const { position, piece } = block;
  const blocks = [];
  // Move forward 1
  const forwardOneIndex = isWhiteNext ? position[0] - 1 : position[0] + 1;
  const forwardOnePosition = [forwardOneIndex, position[1]];
  if (isEmptyPieceBlock(board, forwardOnePosition)) {
    blocks.push(forwardOnePosition);
  }
  // Capture others
  const captureNeighbors = pawnCapture(board, position, isWhiteNext, isWhite);

  switch (piece.line) {
    case 1:
      const forwardTwoIndex = isWhiteNext ? position[0] - 2 : position[0] + 2;
      // Move forward 2
      const forwardTwoPosition = [forwardTwoIndex, position[1]];
      if (
        isEmptyPieceBlock(board, forwardOnePosition) &&
        isEmptyPieceBlock(board, forwardTwoPosition)
      ) {
        blocks.push(forwardTwoPosition);
      }
      return [...blocks, ...captureNeighbors];
    case 5:
      return [
        ...blocks,
        ...captureNeighbors,
        ...pawnEnPassantCapture(board, position, isWhite, isWhiteNext),
      ];

    default:
      return [...blocks, ...captureNeighbors];
  }
}

function pawnEnPassantCapture(board, position, isWhite, isWhiteNext) {
  const [x, y] = position;
  const enPassantPosition = [];
  const enX = isWhiteNext ? x - 1 : x + 1;
  if (isEnPassant(board, [x, y - 1], isWhite)) {
    enPassantPosition.push([enX, y - 1]);
  }
  if (isEnPassant(board, [x, y + 1], isWhite)) {
    enPassantPosition.push([enX, y + 1]);
  }

  return enPassantPosition;
}

function pawnCapture(board, position, isWhiteNext, isWhite) {
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
        ? block.piece.isWhite !== isWhite &&
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
