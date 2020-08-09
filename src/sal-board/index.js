import React from 'react';
import { HORIZONTAL_CAPTION, VERTICAL_CAPTION } from '../constants/index';
import './index.scss';
import Square from './square';

const SALBoard = () => {
  const items = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      items.push([
        { index: i, info: HORIZONTAL_CAPTION[i] },
        { index: j, info: VERTICAL_CAPTION[j] },
      ]);
    }
  }

  return (
    <div className="sal-board">
      <div className="sal-board-game sal-chess-clear-fix">
        {items.map((item, index) => (
          <Square
            item={item}
            white={
              (item[0].index % 2 === 0 && item[1].index % 2 !== 0) ||
              (item[0].index % 2 !== 0 && item[1].index % 2 === 0)
                ? 'white'
                : ''
            }
            key={`sal-chess-square-${index}`}
          />
        ))}
      </div>
      <div className="sal-board-caption"></div>
    </div>
  );
};

export default SALBoard;
