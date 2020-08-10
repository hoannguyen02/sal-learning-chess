import React from 'react';
import './index.scss';

const Block = ({ onClick, disabled, white }) => {
  return (
    <button
      className={`sal-chess-block ${white ? 'white' : ''}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Block;
