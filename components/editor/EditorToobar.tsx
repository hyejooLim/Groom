import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';
import { Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import * as S from '../../styles/ts/components/editor/EditorToolbar';
import logo from '../../public/Groom_Logo_No_Background.png';

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
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut({ redirect: false });
    }
  };

  const title = (
    <div style={{ margin: '10px 5px' }}>
      <p style={{ margin: 0, fontSize: '16px' }}>{session?.user.name}</p>
      <p style={{ color: '#777', fontWeight: '300', fontSize: '13px' }}>{session?.user.email}</p>
    </div>
  );

  const content = <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>;

  return (
    <S.Toolbar className='tool_bar'>
      <S.ImageWrapper>
        <Image
          src={logo}
          alt='groom_logo'
          width={140}
          height={60}
          onClick={handleRouteHome}
          style={{ cursor: 'pointer' }}
        />
      </S.ImageWrapper>
      <S.AuthorInfo>
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
      </S.AuthorInfo>
    </S.Toolbar>
  );
};

export default EditorToolbar;
