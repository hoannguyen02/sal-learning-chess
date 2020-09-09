import React from 'react';
import './action.scss';

const Action = (props) => {
  const { index: blockIndex, onClick } = props;
  return (
    <span>
      {['Add', 'Update', 'Delete'].map((item, index) => (
        <b
          key={`block-action${blockIndex}-${index}`}
          onClick={() => onClick(item)}
        >
          {item}
        </b>
      ))}
    </span>
  );
};

export default Action;
