import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import UserProfile from '../../components/UserProfile';
import Category from '../../components/Category';
import logo from '../../public/Groom_Logo_No_Background.png';
import Counter from '../Counter';
import Search from '../Search';
import {
  Container,
  ImageWrapper,
  StyledSider,
  StyledLayout,
  StyledHeader,
  StyledFooter,
} from '../../styles/ts/components/layouts/AppLayout';

const AppLayout = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, []);

  return (
    <>
      <Container>
        <StyledSider width={300}>
          {status === 'authenticated' ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </StyledSider>
        <StyledLayout>
          <StyledHeader>
            <ImageWrapper>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={140} height={60} />
                </a>
              </Link>
            </ImageWrapper>
          </StyledHeader>
          <Layout.Content>
            {children}
            <StyledFooter>Powered by Groom, Designed by sandy</StyledFooter>
          </Layout.Content>
        </StyledLayout>
      </Container>
    </>
  );
};

export default AppLayout;
