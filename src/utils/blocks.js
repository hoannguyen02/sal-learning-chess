import { HORIZONTAL_CAPTION, VERTICAL_CAPTION } from '../constants/index';
export { generateBlocks };

function generateBlocks() {
  const items = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      items.push({
        position: [i, j],
        caption: `${HORIZONTAL_CAPTION[j]}${VERTICAL_CAPTION[i]}`,
        piece: null,
        disabled: true,
        highLight: false,
      });
    }
  }

  return items;
}
