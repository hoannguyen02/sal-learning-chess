import { compose } from './compose';
import { resetAvailablePositions } from './reset-available-positions';
import { highLightBlocks } from './high-light-blocks';
import { getAvailablePositions } from './get-available-positions/index';

const handleResetAndGetNewPositions = (state) =>
  resetAndGetNewPositions(
    highLightBlocks,
    getAvailablePositions,
    resetAvailablePositions
  )(state);

export { handleResetAndGetNewPositions };

function resetAndGetNewPositions(...fns) {
  return fns.reduce(compose);
}
