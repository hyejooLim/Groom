import React, { FC } from 'react';
import classnames from 'classnames';

import { ToastMessageWrapper } from '../../styles/ts/components/ToastMessage';

interface ToastMessageProps {
  toastMessage: string;
  showToastMessage: boolean;
  show: boolean;
}

const ToastMessage: FC<ToastMessageProps> = ({ toastMessage, showToastMessage, show }) => {
  return (
    <ToastMessageWrapper>
      {showToastMessage && (
        <div className='toast_wrapper'>
          <div className={classnames('toast_message', { show })}>{toastMessage}</div>
        </div>
      )}
    </ToastMessageWrapper>
  );
};

export default ToastMessage;
