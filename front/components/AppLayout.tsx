import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Layout, Button } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Category from './Category';
import logo from '../public/Groom_Logo_No_Background.png';

const { Header, Sider, Content, Footer } = Layout;

const LogoWrapper = styled.div``;

const HomeButton = styled(Button)`
  outline: none;
  float: right;
  border: 0;
  padding: 0;
  margin: 15px 30px 0 0;
  background-color: transparent;
  cursor: pointer;
`;

const AppLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Sider width={300}>
          {user ? <UserProfile /> : <LoginForm />}
          <Category />
        </Sider>
        <Layout style={{ backgroundColor: '#f1f1f1', width: '100vw' }}>
          <Header style={{ height: '80px' }}>
            <LogoWrapper>
              <Link href='/'>
                <a>
                  <HomeButton>
                    <Image src={logo} alt='groom_logo' width={140} height={60} />
                  </HomeButton>
                </a>
              </Link>
            </LogoWrapper>
          </Header>
          <Content style={{ margin: '0px 30px' }}>{children}</Content>
          <Footer style={{ textAlign: 'center', marginTop: 10, fontSize: '12px', color: '#666' }}>
            Powered by Groom, Designed by sandy
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
