import React, { FC } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const ToastMessageWrapper = styled.div`
  position: fixed;
  top: 70px;
  width: 100%;
  z-index: 1;

  .toast_message {
    width: 100%;
    min-width: 640px;
    transition: height 0.5s ease-in-out;
    height: 0;
    line-height: 50px;
    text-align: center;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 /4%), 0 1px 0 0 rgb(0 0 0 /4%);
    letter-spacing: -0.2px;
    overflow: hidden;
    color: #f54;
    background-color: #f8f8f8;
    font-size: 15px;
    font-weight: 300;
  }

  .toast_message.show {
    height: 50px;
  }
`;

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
