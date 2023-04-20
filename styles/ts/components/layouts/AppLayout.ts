import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Sider, Footer } = Layout;

export const Container = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const ImageWrapper = styled.div`
  outline: none;
  float: right;
  border: 0;
  padding: 0;
  margin: 15px 0 0 0;
  background-color: transparent;
`;

export const StyledSider = styled(Sider)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 100%;
  color: #fff;
  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: scroll;
  scroll-behavior: smooth;
  transition: background-color 0.8s;

  &:hover {
    color: #13a085;

    &::-webkit-scrollbar-thumb {
      background-color: #13a085;
    }
  }

  // 스크롤바 영역에 대한 설정
  &::-webkit-scrollbar {
    width: 3px;
  }

  // 스크롤바 막대에 대한 설정
  &::-webkit-scrollbar-thumb {
    height: 30%;
    border-radius: 20px;
    box-shadow: inset 0 0 0 10px;
  }

  // 스크롤바 뒷 배경에 대한 설정
  &::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 0 10px; */
  }

  @media (max-width: 959px) {
    z-index: 100;
    transform: translate3d(-300px, 0, 0);
    transition: all 0.2s;
  }
`;

export const StyledLayout = styled(Layout)`
  margin-left: 330px;
  padding-right: 30px;
  width: 100%;

  @media (max-width: 959px) {
    margin: 0 auto;
    padding: 0 10px;
  }
`;

export const StyledHeader = styled(Header)`
  height: 80px;
  padding: 0 24px;
  background: transparent;
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
  font-size: 12px;
  position: relative;
  margin-top: 50px;
  height: 30px;
  color: #666;
`;
