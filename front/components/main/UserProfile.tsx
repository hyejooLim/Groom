import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar } from 'antd';
import { BsCloudFill } from 'react-icons/bs';

import { UserType } from '../../types';
import * as S from '../../styles/ts/components/main/UserProfile';

const UserProfile = ({ user }: { user: UserType }) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <S.UserProfileWrapper>
      <S.InfoArea>
        <Link href='/manage'>
          <a className='go_to_profile'>
            <Avatar
              size={80}
              icon={<BsCloudFill style={{ height: '80px', lineHeight: '80px' }} />}
              src={user?.imageUrl}
            />
          </a>
        </Link>
        <S.UserInfo>
          <S.InfoBox>
            <Link href='/manage'>
              <a className='go_to_profile'>
                <span>{user?.name}님</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{user?.email}</div>
          </S.InfoBox>
          <S.NewBox>
            <div className='posts'>
              <span>게시글</span>
              <span className='count'>{user?.posts?.length}</span>
            </div>
          </S.NewBox>
        </S.UserInfo>
      </S.InfoArea>
      <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
