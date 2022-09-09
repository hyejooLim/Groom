import styled from 'styled-components';
import { Button } from 'antd';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & .text {
    font-size: 18px;
  }

  & .title {
    color: #ff5544;
    margin: 0 6px 0 8px;
  }

  & .count {
    font-size: 14px;
    color: #888;
    margin-left: 8px;
  }
`;

export const CloseButton = styled(Button)`
  font-size: 20px;
  background-color: transparent;
  border: 0;
  outline: none;
  box-shadow: none;
`;
