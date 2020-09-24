import React from 'react';
import { Backdrop } from '../../../components';
import './index.scss';
import Status from './Status';

const StatusPopup = (props) => {
  const { open } = props;

  return (
    <>
      <Backdrop open={open} position="absolute" />
      <Status {...props} />
    </>
  );
};

export default StatusPopup;
