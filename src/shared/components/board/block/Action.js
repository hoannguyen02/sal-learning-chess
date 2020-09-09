import React from 'react';
import './action.scss';
import { UpdateModeType } from '../../../constants';

const Action = (props) => {
  const { index: blockIndex, onClick, piece } = props;
  const items = piece
    ? [UpdateModeType.UPDATE, UpdateModeType.DELETE]
    : [UpdateModeType.ADD];
  const handleClick = (event, item) => {
    onClick(item);
    event.stopPropagation();
  };
  return (
    <span className="update-mode-action">
      {items.map((item, index) => (
        <b
          style={{ cursor: 'pointer' }}
          key={`block-action${blockIndex}-${index}`}
          onClick={(event) => handleClick(event, item)}
        >
          {item}
        </b>
      ))}
    </span>
  );
};

export default Action;
