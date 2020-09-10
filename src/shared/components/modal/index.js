/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import Backdrop from '../backdrop';
import Overlay from './Overlay';

const Modal = (props) => {
  const { open, onClose, disabled } = props;

  const handleKeydown = useCallback((e) => {
    const { onClose } = props;
    if (e.keyCode === 27) {
      !disabled && onClose && onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);
    return () => {
      document.removeEventListener('keydown', handleKeydown, false);
    };
  }, [handleKeydown]);

  return (
    <div className="root">
      <Backdrop open={open} onClick={onClose} />
      <Overlay {...props} />
    </div>
  );
};

export default Modal;
