import styled from 'styled-components';

export const ToastMessageWrapper = styled.div`
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

  .toast_message.height {
    height: 50px;
  }
`;
