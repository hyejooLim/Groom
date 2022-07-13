import React from 'react';
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
import { user } from '../../pages';

const { Header, Sider, Content, Footer } = Layout;

export const ImageWrapper = styled.div`
  outline: none;
  float: right;
  border: 0;
  padding: 0;
  margin: 15px 0 0 0;
  background-color: transparent;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Sider width={300} style={{ position: 'fixed', top: 0, left: 0, bottom: 0, backgroundColor: '#fff' }}>
          {user ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </Sider>
        <Layout style={{ marginLeft: '300px', width: '100%', height: '100%' }}>
          <Header style={{ height: '80px', backgroundColor: 'transparent', padding: '0 24px' }}>
            <ImageWrapper>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={140} height={60} />
                </a>
              </Link>
            </ImageWrapper>
          </Header>
          <Content style={{ margin: '0 30px', height: '80%' }}>
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
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
