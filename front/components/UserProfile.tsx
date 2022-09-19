import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar } from 'antd';
import { BsCloudFill } from 'react-icons/bs';

import useGetUser from '../hooks/query/useGetUser';
import {
  UserProfileWrapper,
  InfoArea,
  UserInfo,
  InfoBox,
  NewBox,
  LogoutButton,
} from '../styles/ts/components/UserProfile';

const UserProfile = () => {
  const { data: user } = useGetUser();

  const handleLogout = () => {
    signOut();
  };

  return (
    <UserProfileWrapper>
      <InfoArea>
        <Avatar size={80} icon={<BsCloudFill style={{ height: '80px', lineHeight: '80px' }} />} src={user?.imageUrl} />
        <UserInfo>
          <InfoBox>
            <Link href={`/manage`}>
              <a className='go_to_profile'>
                <span>{user?.name}님</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{user?.email}</div>
          </InfoBox>
          <NewBox>
            <div className='posts'>
              <span>게시글</span>
              <span className='count'>{user?.posts?.length}</span>
            </div>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
