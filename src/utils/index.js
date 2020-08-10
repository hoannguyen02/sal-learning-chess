import { HORIZONTAL_CAPTION, VERTICAL_CAPTION } from '../constants/index';
export { generateBlocks };

function generateBlocks() {
  const items = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      items.push([
        { index: i, info: HORIZONTAL_CAPTION[i] },
        { index: j, info: VERTICAL_CAPTION[j] },
      ]);
    }
  }

  return items;
}
