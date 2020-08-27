import React from 'react';
import Backdrop from '../../components';
import Promotions from './promotions';

const PromotionPopup = (props) => {
  const { open } = props;

  return (
    <>
      <Backdrop open={open} position="absolute" />
      <Promotions {...props} />
    </>
  );
};

export default PromotionPopup;
