import React, { FC } from 'react';
import classnames from 'classnames';

import { ToastMessageWrapper } from '../../styles/ts/components/ToastMessage';

interface ToastMessageProps {
  show: boolean;
  height: boolean;
  message: string;
}

const ToastMessage: FC<ToastMessageProps> = ({ show, height, message }) => {
  return (
    <ToastMessageWrapper>
      {show && (
        <div className='toast_wrapper'>
          <div className={classnames('toast_message', { height })}>{message}</div>
        </div>
      )}
    </ToastMessageWrapper>
  );
};

export default ToastMessage;
