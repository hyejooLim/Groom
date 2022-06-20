import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Button } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import Category from './Category';

const { Header, Sider, Content, Footer } = Layout;

const LogoWrapper = styled.div``;

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
              <Button>
                <img src='../public/Groom_Logo_White.png' alt='groom_logo' />
              </Button>
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
