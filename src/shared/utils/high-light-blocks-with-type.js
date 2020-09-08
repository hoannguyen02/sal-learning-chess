import { PieceType } from '../constants';

export { highLightBlocksWithType };
// Hight light blocks based on type to for user to recognize
function highLightBlocksWithType(board, pieceType) {
  let newBoard = [...board];
  if (Object.keys(PieceType).filter((type) => type === pieceType).length > 0) {
    newBoard = newBoard.map((block) => {
      const { piece } = block;
      const enabled = piece && piece.type === pieceType;
      return {
        ...block,
        opacity: enabled ? '1' : '0.1',
      };
    });
  } else {
    newBoard = newBoard.map((block) => {
      return {
        position: block.position,
        caption: block.caption,
        piece: block.piece,
        disabled: block.disabled,
      };
    });
  }
  return newBoard;
}
