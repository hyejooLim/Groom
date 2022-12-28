import styled from 'styled-components';
import { Button } from 'antd';

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & .text {
    font-size: 20px;
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

export const NewIcon = styled.span`
  color: #fff;
  background-color: #ff3434;
  padding: 1px 4px;
  margin-left: 16px;
  border-radius: 50%;
  font-family: 'Courier New';
`;
