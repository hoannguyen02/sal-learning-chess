import { compose } from './compose';
import { resetHighlightBlocks } from './reset-highlight-blocks';
import { highLightBlocks } from './high-light-blocks';
import { getAvailablePositions } from './get-available-positions/index';

const handleResetAndGetNewPositions = (state) =>
  resetAndGetNewPositions(
    highLightBlocks,
    getAvailablePositions,
    resetHighlightBlocks
  )(state);

export { handleResetAndGetNewPositions };

function resetAndGetNewPositions(...fns) {
  return fns.reduce(compose);
}
