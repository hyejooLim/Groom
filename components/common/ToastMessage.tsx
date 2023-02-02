import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';

import { ToastMessageWrapper } from '../../styles/ts/components/common/ToastMessage';

interface ToastMessageProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ToastMessage: FC<ToastMessageProps> = ({ message, setMessage }) => {
  const [showHeight, setShowHeight] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);

  useEffect(() => {
    if (message !== '') {
      setShowToastMessage(true);

      setTimeout(() => {
        setShowHeight(true);
      }, 1000);

      setTimeout(() => {
        setShowHeight(false);
      }, 3000);

      setTimeout(() => {
        setShowToastMessage(false);
        setMessage('');
      }, 4000);
    }
  }, [message]);

  return (
    <ToastMessageWrapper>
      {showToastMessage && (
        <div className='toast_wrapper'>
          <div className={classnames('toast_message', { height: showHeight })}>{message}</div>
        </div>
      )}
    </ToastMessageWrapper>
  );
};

export default ToastMessage;
