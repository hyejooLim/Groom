import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';
import { Avatar, Button, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logo from '../../public/Groom_Logo_No_Background.png';

const Toolbar = styled.div`
  position: fixed;
  top: 0;
  min-width: 944px;
  width: 100%;
  height: 70px;
  background-color: #fff;
  z-index: 1;
  transition: opacity 0.5s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ImageWrapper = styled.div`
  outline: none;
  border: 0;
  padding: 0;
  margin: 8px 0 0 34px;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  @media (max-width: 1060px) {
    display: none;
  }
`;

const AuthorInfo = styled.div`
  margin: 18px 20px 0 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;

  @media (max-width: 1060px) {
    display: none;
  }
`;

const LogoutButton = styled(Button)`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: #909090;
  text-align: left;
  box-shadow: none;
`;

const EditorToolbar = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session } = useSession();

  const handleToggleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleRouteHome = () => {
    const confirm = window.confirm('홈페이지로 돌아가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
    if (confirm) {
      Router.push('/');
    }
  };

  const handleLogout = () => {
    signOut();
  };

  const title = (
    <div style={{ margin: '10px 5px' }}>
      <p style={{ margin: 0, fontSize: '16px' }}>{session?.user.name}</p>
      <p style={{ color: '#777', fontWeight: '300', fontSize: '13px' }}>{session?.user.email}</p>
    </div>
  );

  const content = <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>;

  return (
    <Toolbar className='tool_bar'>
      <ImageWrapper>
        <Image
          src={logo}
          alt='groom_logo'
          width={140}
          height={60}
          onClick={handleRouteHome}
          style={{ cursor: 'pointer' }}
        />
      </ImageWrapper>
      <AuthorInfo>
        <span>{session?.user.name}</span>
        <Popover
          placement='bottomRight'
          title={title}
          content={content}
          trigger='click'
          visible={showInfo}
          onVisibleChange={handleToggleShowInfo}
        >
          <div style={{ margin: '0 34px 0 14px', display: 'inline-block', cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Popover>
      </AuthorInfo>
    </Toolbar>
  );
};

export default EditorToolbar;
