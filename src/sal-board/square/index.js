import React from 'react';
import './index.scss';

const Square = ({ onClick, disabled, white }) => {
  return (
    <button
      className={`sal-chess-square ${white ? 'white' : ''}`}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Square;
