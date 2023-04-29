import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import ManageProfile from '../manage/ManageProfile';
import ManageWrite from '../manage/ManageWrite';
import ManageList from '../manage/ManageList';
import logo from '../../public/Groom_Logo_No_Background.png';
import * as S from '../../styles/ts/components/layouts/ManageLayout';

const ManageLayout = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      Router.push('/login');
    }
  }, [status]);

  return (
    <>
      <S.Container>
        <S.StyledSider width={240}>
          <ManageProfile />
          <ManageWrite />
          <ManageList />
        </S.StyledSider>
        <S.StyledLayout>
          <S.StyledHeader>
            <S.HomeButton>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={160} height={70} />
                </a>
              </Link>
            </S.HomeButton>
            <Link href='/write'>
              <a>
                <S.AddPostButton>
                  <span>글쓰기</span>
                  <EditOutlined />
                </S.AddPostButton>
              </a>
            </Link>
          </S.StyledHeader>
          <Layout.Content style={{ width: '912px' }}>{children}</Layout.Content>
        </S.StyledLayout>
      </S.Container>
    </>
  );
};

export default ManageLayout;
