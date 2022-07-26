import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Avatar, Button, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logo from '../../../public/Groom_Logo_No_Background.png';

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
  margin: 8px 0 0 20px;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const AuthorInfo = styled.div`
  margin: 18px 0 0 20px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
`;

const LogoutButton = styled(Button)`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #909090;
  text-align: left;
  box-shadow: none;
`;

const EditorToolbar = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleToggleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleLogout = () => {
    // logout
  };

  const title = (
    <div style={{ margin: '10px 5px' }}>
      <p style={{ margin: 0, fontSize: '16px' }}>userName</p>
      <p style={{ color: '#777', fontWeight: '300', fontSize: '13px' }}>userEmail</p>
    </div>
  );

  const content = <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>;

  return (
    <Toolbar className='tool_bar'>
      <ImageWrapper>
        <Link href='/'>
          <a>
            <Image src={logo} alt='groom_logo' width={140} height={60} />
          </a>
        </Link>
      </ImageWrapper>
      <AuthorInfo>
        <span>userName</span>
        <Popover
          placement='bottomRight'
          title={title}
          content={content}
          trigger='click'
          visible={showInfo}
          onVisibleChange={handleToggleShowInfo}
        >
          <div style={{ margin: '0 34px 0 14px', display: 'inline-block' }}>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Popover>
      </AuthorInfo>
    </Toolbar>
  );
};

export default EditorToolbar;
