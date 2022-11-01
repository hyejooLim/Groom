import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import ManageProfile from '../manage/ManageProfile';
import ManageList from '../manage/ManageList';
import logo from '../../public/Groom_Logo_No_Background.png';
import * as S from '../../styles/ts/components/layouts/ManageLayout';

const ManageLayout = ({ children }) => {
  return (
    <>
      <S.Container>
        <S.StyledSider width={240}>
          <ManageProfile />
          <ManageList />
        </S.StyledSider>
        <Layout style={{ width: '100%', height: '100%' }}>
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
          <Layout.Content style={{ width: '889px' }}>{children}</Layout.Content>
        </Layout>
      </S.Container>
    </>
  );
};

export default ManageLayout;
