import React, { useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import UserProfile from '../../components/UserProfile';
import Category from '../../components/Category';
import Counter from '../Counter';
import Search from '../Search';
import { currentPageState, firstIndexState, lastIndexState, PAGE_SIZE } from '../../recoil/page';
import * as S from '../../styles/ts/components/layouts/AppLayout';
import logo from '../../public/Groom_Logo_No_Background.png';

const AppLayout = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  const setCurrentPage = useSetRecoilState(currentPageState);
  const setFirstIndex = useSetRecoilState(firstIndexState);
  const setLastIndex = useSetRecoilState(lastIndexState);

  useEffect(() => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(PAGE_SIZE);
  }, [router.pathname]);

  const onClickLogo = useCallback(() => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(PAGE_SIZE);

    Router.push('/');
  }, []);

  return (
    <>
      <S.Container>
        <S.StyledSider width={300}>
          {status === 'authenticated' ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </S.StyledSider>
        <S.StyledLayout>
          <S.StyledHeader>
            <S.ImageWrapper>
              <a onClick={onClickLogo}>
                <Image src={logo} alt='groom_logo' width={140} height={60} />
              </a>
            </S.ImageWrapper>
          </S.StyledHeader>
          <Layout.Content>
            {children}
            <S.StyledFooter>Powered by Groom, Designed by sandy</S.StyledFooter>
          </Layout.Content>
        </S.StyledLayout>
      </S.Container>
    </>
  );
};

export default AppLayout;
