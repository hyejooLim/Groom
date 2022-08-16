import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  UserProfileWrapper,
  InfoArea,
  UserInfo,
  InfoBox,
  NewBox,
  LogoutButton,
} from '../styles/ts/components/UserProfile';

const UserProfile = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <UserProfileWrapper>
      <InfoArea>
        <Avatar size={60} icon={<UserOutlined />} />
        <UserInfo>
          <InfoBox>
            <Link href={`/manage`}>
              <a className='go_to_profile'>
                <span>{session.user.name}님</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{session.user.email}</div>
          </InfoBox>
          <NewBox>
            <div className='posts'>
              <span>게시글</span>
              <span className='count'>0</span>
            </div>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
