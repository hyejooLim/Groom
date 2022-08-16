import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import ManageProfile from '../../components/ManageProfile';
import ManageList from '../../components/ManageList';
import logo from '../../public/Groom_Logo_No_Background.png';
import { Container, HomeButton, AddPostButton, StyledSider, StyledHeader } from '../../styles/ts/components/layouts/ManageLayout';

const ManageLayout = ({ children }) => {
  return (
    <>
      <Container>
        <StyledSider width={214}>
          <ManageProfile />
          <ManageList />
        </StyledSider>
        <Layout style={{ width: '100%' }}>
          <StyledHeader>
            <HomeButton>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={140} height={60} />
                </a>
              </Link>
            </HomeButton>
            <Link href='/write'>
              <a>
                <AddPostButton>
                  <span>글쓰기</span>
                  <EditOutlined />
                </AddPostButton>
              </a>
            </Link>
          </StyledHeader>
          <Layout.Content style={{ width: '886px' }}>{children}</Layout.Content>
        </Layout>
      </Container>
    </>
  );
};

export default ManageLayout;
