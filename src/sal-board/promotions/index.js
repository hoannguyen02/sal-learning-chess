import React, { useRef, useState, useEffect } from 'react';
import { PieceType } from '../../constants';
import PromotionItem from './PromotionItem';
import './index.scss';

const Promotions = ({ onClick, piece, isWhiteNext }) => {
  const { position } = piece;
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [promotionStyles, setPromotionStyles] = useState({});

  useEffect(() => {
    ref && ref.current && setWidth(ref.current.clientWidth);
    !isWhiteNext
      ? setPromotionStyles({ top: 0, bottom: 'auto' })
      : setPromotionStyles({ bottom: 0, top: 'auto' });
  }, [ref, isWhiteNext]);

  return (
    <div
      className="sal-promotions sal-chess-clear-fix"
      style={{ left: `${position[1] * 12.5}%`, ...promotionStyles }}
      ref={ref}
    >
      {[PieceType.QUEEN, PieceType.KNIGHT, PieceType.BISHOP, PieceType.ROOK]
        .map((type) => ({
          ...piece,
          type,
        }))
        .map((promotion, index) => (
          <PromotionItem
            onClick={onClick}
            promotion={promotion}
            style={{ height: width }}
            key={`sal-promotion-${index}`}
          />
        ))}
    </div>
  );
};

export default Promotions;
