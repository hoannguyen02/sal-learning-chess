import React from 'react';
import './index.scss';

const Backdrop = ({ onClick, open, position }) => (
  <button
    className={`backdrop fade ${open ? 'open' : ''}`}
    style={{ position }}
    onClick={onClick ? onClick : () => {}}
  />
);

export default Backdrop;
