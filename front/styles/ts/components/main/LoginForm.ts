import styled from 'styled-components';
import { Button } from 'antd';

export const LoginFormWrapper = styled.div`
  height: 220px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .info {
    margin-bottom: 30px;
    font-size: 15px;
    color: #000;
  }
`;

export const LoginButton = styled(Button)`
  color: #fff;
  background-color: #13a085;
  height: 52px;
  width: 258px;
  border-radius: 8px;

  &:hover {
    color: #fff;
    background-color: #13a085;
  }

  &:focus {
    color: #fff;
    background-color: #13a085;
  }

  .text {
    font-size: 20px;
    font-weight: 800;
    margin-right: 20px;
  }
`;
