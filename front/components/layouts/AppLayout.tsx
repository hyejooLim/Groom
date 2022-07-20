import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import UserProfile from '../../components/UserProfile';
import Category from '../../components/Category';
import logo from '../../public/Groom_Logo_No_Background.png';
import Counter from '../Counter';
import Search from '../Search';

const { Header, Sider, Content, Footer } = Layout;

export const ImageWrapper = styled.div`
  outline: none;
  float: right;
  border: 0;
  padding: 0;
  margin: 15px 0 0 0;
  background-color: transparent;
`;

const StyledSider = styled(Sider)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ddd;

  @media (max-width: 959px) {
    z-index: 100;
    transform: translate3d(-300px, 0, 0);
    transition: all 0.2s;
  }
`;

const StyledLayout = styled(Layout)`
  margin-left: 330px;
  padding-right: 30px;
  width: 100%;

  @media (max-width: 959px) {
    margin: 0 auto;
    padding: 0 10px;
  }
`;

const AppLayout = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <StyledSider width={300}>
          {status === 'authenticated' ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </StyledSider>
        <StyledLayout>
          <Header style={{ height: '80px', backgroundColor: 'transparent', padding: '0 24px' }}>
            <ImageWrapper>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={140} height={60} />
                </a>
              </Link>
            </ImageWrapper>
          </Header>
          <Content>
            {children}
            <Footer
              style={{
                textAlign: 'center',
                fontSize: '12px',
                position: 'relative',
                marginTop: '100px',
                height: '30px',
                color: '#666',
              }}
            >
              Powered by Groom, Designed by sandy
            </Footer>
          </Content>
        </StyledLayout>
      </Layout>
    </>
  );
};

export default AppLayout;
