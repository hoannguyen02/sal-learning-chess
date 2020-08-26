import React from 'react';
import './promotion-item.scss';
import PieceIcon from '../icons';

// Actually promotion is piece with type is not King or Pawn
const PromotionItem = ({ onClick, promotion, style }) => {
  return (
    <button
      className={`sal-promotion-item`}
      onClick={() => onClick(promotion.type)}
      style={style}
    >
      <PieceIcon type={promotion.type} isWhite={promotion.isWhite} />
    </button>
  );
};

export default PromotionItem;
