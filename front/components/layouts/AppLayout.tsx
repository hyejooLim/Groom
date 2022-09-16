import React, { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import UserProfile from '../../components/UserProfile';
import Category from '../../components/Category';
import Counter from '../Counter';
import Search from '../Search';
import { currentPageState, firstIndexState, lastIndexState, PAGE_SIZE } from '../../recoil/page';
import {
  Container,
  ImageWrapper,
  StyledSider,
  StyledLayout,
  StyledHeader,
  StyledFooter,
} from '../../styles/ts/components/layouts/AppLayout';
import logo from '../../public/Groom_Logo_No_Background.png';

const AppLayout = ({ children }) => {
  const { status } = useSession();

  const setCurrentPage = useSetRecoilState(currentPageState);
  const setFirstIndex = useSetRecoilState(firstIndexState);
  const setLastIndex = useSetRecoilState(lastIndexState);

  const onClickLogo = useCallback(() => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(PAGE_SIZE);

    Router.push('/');
  }, []);

  return (
    <>
      <Container>
        <StyledSider className='scrollbar' width={300}>
          {status === 'authenticated' ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </StyledSider>
        <StyledLayout>
          <StyledHeader>
            <ImageWrapper>
              <a onClick={onClickLogo}>
                <Image src={logo} alt='groom_logo' width={140} height={60} />
              </a>
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
