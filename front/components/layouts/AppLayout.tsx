import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { Layout } from 'antd';

import LoginForm from '../main/LoginForm';
import UserProfile from '../main/UserProfile';
import Category from '../main/Category';
import Counter from '../common/Counter';
import Search from '../main/Search';
import { currentPageState, firstIndexState, lastIndexState, PAGE_SIZE } from '../../recoil/page';
import * as S from '../../styles/ts/components/layouts/AppLayout';
import logo from '../../public/Groom_Logo_No_Background.png';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

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
          {status !== 'unauthenticated' ? <UserProfile /> : <LoginForm />}
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
