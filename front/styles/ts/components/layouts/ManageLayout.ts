import styled from 'styled-components';
import { Layout, Button } from 'antd';

const { Header, Sider } = Layout;

export const Container = styled(Layout)`
  position: relative;
  width: 1180px;
  height: 100%;
  margin: auto;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeButton = styled.div`
  outline: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  text-align: center;
`;

export const AddPostButton = styled(Button)`
  float: right;
  width: 110px;
  height: 42px;
  background-color: #13a085;
  margin-top: 30px;
  font-size: 15px;
  color: #fff;
  border-radius: 24px;
  transition: all 0.2s ease-in;

  :hover {
    transform: scale(1.03);
    background-color: #13a085;
    color: #fff;
  }
`;

export const StyledSider = styled(Sider)`
  margin: 100px 50px 50px 0;
  background: transparent;
`;

export const StyledHeader = styled(Header)`
  height: 180px;
  background: transparent;
  padding: 0;
`;
