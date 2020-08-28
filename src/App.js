import React from 'react';
import { Game } from './components';
import { BLACK_PIECES, WHITE_PIECES } from './constants';

const App = () => {
  return <Game whitePieces={WHITE_PIECES} blackPieces={BLACK_PIECES} />;
};

export default App;
