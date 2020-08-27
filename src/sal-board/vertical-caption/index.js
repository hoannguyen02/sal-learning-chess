import React from 'react';
import './index.scss';

const VerticalCaption = () => {
  return (
    <div className="vertical-caption caption-base">
      {[8, 7, 6, 5, 4, 3, 2, 1].map((caption, index) => (
        <span key={`vertical-caption${index}`} className="block-base">
          {caption}
        </span>
      ))}
    </div>
  );
};

export default VerticalCaption;
