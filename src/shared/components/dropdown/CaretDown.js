import React from 'react';
import './CaretDown.scss';
import './icon.scss';

const CaretDown = (props) => {
  const { className, focusable } = props;
  return (
    <svg
      className={`caret-down icon ${className ? className : ''}`}
      focusable={focusable | false}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
  );
};

export default CaretDown;
