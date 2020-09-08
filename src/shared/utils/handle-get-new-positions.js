import { compose } from './compose';
import { highLightBlocks } from './high-light-blocks';
import { getAvailablePositions } from './get-available-positions/index';

const handleGetNewPositions = (state) =>
  getNewPositions(highLightBlocks, getAvailablePositions)(state);

export { handleGetNewPositions };

function getNewPositions(...fns) {
  return fns.reduce(compose);
}
