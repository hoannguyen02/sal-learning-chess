export { validateStatus };
function validateStatus(nextBlocks, movesCount, actualPiece) {
  const expectPiece = nextBlocks[movesCount - 1];
  return (
    actualPiece.isWhite === expectPiece.isWhite &&
    actualPiece.type === expectPiece.type
  );
}
