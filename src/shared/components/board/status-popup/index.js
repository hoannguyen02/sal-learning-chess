import React from 'react';
import { Backdrop } from '../../../components';
import './index.scss';
import Status from './Status';

const StatusPopup = (props) => {
  const { open, isValidMoved } = props;

  return (
    <>
      <Backdrop open={open} position="absolute" />
      <Status isValidMoved={isValidMoved} open={open} />
    </>
  );
};

export default StatusPopup;
