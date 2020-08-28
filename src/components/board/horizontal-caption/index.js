import React from 'react';
import './index.scss';

const HorizontalCaption = () => {
  return (
    <div className="horizontal-caption caption-base">
      {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((caption, index) => (
        <span key={`horizontal-caption${index}`} className="block-base">
          {caption}
        </span>
      ))}
    </div>
  );
};

export default HorizontalCaption;
