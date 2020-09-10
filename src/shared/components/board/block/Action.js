import React from 'react';
import './action.scss';
import { UpdateModeType } from '../../../constants';

const Action = (props) => {
  const { onClick, piece } = props;
  const item = piece ? UpdateModeType.DELETE : UpdateModeType.ADD;

  const handleClick = (event, item) => {
    onClick(item);
    event.stopPropagation();
  };

  return (
    <span
      className="update-mode-action"
      style={{ cursor: 'pointer' }}
      onClick={(event) => handleClick(event, item)}
    >
      {item}
    </span>
  );
};

export default Action;
