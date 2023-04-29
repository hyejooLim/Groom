import styled from 'styled-components';
import { Layout, Button } from 'antd';

const { Header, Sider } = Layout;

export const Container = styled(Layout)`
  position: relative;
  width: 1180px;
  height: 100%;
  margin: auto;
  padding: 54px 0;
  display: flex;
  flex-direction: row;

  @media (min-width: 1860px) {
    margin: 0 auto;
    padding: 150px 0;
  }
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

  :focus {
    background-color: #13a085;
    color: #fff;
  }
`;

export const StyledSider = styled(Sider)`
  position: relative;
  top: 30px;
  left: 0px;
  height: 100%;
  background: transparent;
`;

export const StyledLayout = styled(Layout)`
  margin-left: 30px;
  width: 100%;
  height: 100%;
`;

export const StyledHeader = styled(Header)`
  height: 180px;
  background: transparent;
  padding: 0;
`;
