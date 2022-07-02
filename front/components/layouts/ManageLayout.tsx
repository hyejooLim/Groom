import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Layout, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import ManageProfile from '../../components/ManageProfile';
import ManageList from '../../components/ManageList';
import logo from '../../public/Groom_Logo_No_Background.png';

const { Header, Sider, Content, Footer } = Layout;

const HomeButton = styled.div`
  outline: none;
  border: 0;
  padding: 0;
  margin-top: 30px;
  background-color: transparent;
  text-align: center;
`;

const AddPostButton = styled(Button)`
  float: right;
  border: 0;
  outline: none;
  height: 38px;
  background-color: #13a085;
  margin-top: 30px;
  font-size: 15px;
  color: #fff;
  border-radius: 8px;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #13a085;
    color: #fff;
  }
`;

const ManageLayout = ({ children }) => {
  const onWritePost = useCallback(() => {
    // Editor page로 이동
  }, []);

  return (
    <>
      <Layout style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Sider width={214} style={{ margin: '100px 50px 50px 130px', backgroundColor: 'transparent' }}>
          <ManageProfile />
          <ManageList />
        </Sider>
        <Layout style={{ width: '100%', marginRight: '130px' }}>
          <Header style={{ height: '180px', backgroundColor: 'transparent', padding: 0 }}>
            <HomeButton>
              <Link href='/'>
                <a>
                  <Image src={logo} alt='groom_logo' width={140} height={60} />
                </a>
              </Link>
            </HomeButton>
            <AddPostButton onClick={onWritePost}>
              <span>글쓰기</span>
              <EditOutlined />
            </AddPostButton>
          </Header>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ManageLayout;
