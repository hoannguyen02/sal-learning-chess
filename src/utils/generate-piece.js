export { generatePiece };

function generatePiece(pos, type) {
  return {
    pos,
    type,
    move: function name(nextPos) {
      console.log(`${type} at ${pos[0][1]} moving to ${nextPos[0][1]}`);
    },
  };
}
