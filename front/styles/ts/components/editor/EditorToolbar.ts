import styled from 'styled-components';
import { Button } from 'antd';

export const Toolbar = styled.div`
  position: fixed;
  top: 0;
  min-width: 944px;
  width: 100%;
  height: 70px;
  background-color: #fff;
  z-index: 1;
  transition: opacity 0.5s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const ImageWrapper = styled.div`
  outline: none;
  border: 0;
  padding: 0;
  margin: 8px 0 0 34px;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const AuthorInfo = styled.div`
  margin: 18px 20px 0 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;

  @media (max-width: 1060px) {
    display: none;
  }
`;

export const LogoutButton = styled(Button)`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: #909090;
  text-align: left;
  box-shadow: none;
`;
