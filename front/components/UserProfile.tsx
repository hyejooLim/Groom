import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { user } from '../pages';

const UserProfileWrapper = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0 24px 0;
`;

const UserInfo = styled.div`
  margin-left: 30px;
`;

const InfoBox = styled.div`
  margin-bottom: 20px;

  & span {
    color: #000;
    font-size: 18px;
    font-weight: 600;
  }
`;

const NewBox = styled.div`
  display: flex;
  font-size: 14px;

  .posts {
    margin-right: 12px;
  }

  .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.16);
    display: inline-block;
    margin: 0 5px -1px 5px;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #13a085;
  color: #fff;
  width: 80px;
  height: 36px;
  border-radius: 8px;
  padding: 0;

  :hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #13a085;
    color: #fff;
  }
`;

const UserProfile = () => {
  const handleLogout = () => {};

  return (
    <UserProfileWrapper>
      <InfoArea>
        <Avatar size={60} icon={<UserOutlined />} />
        <UserInfo>
          <InfoBox>
            <Link href={`/manage`}>
              <a className='go_to_profile'>
                <span>{user.name}님</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{user.email}</div>
          </InfoBox>
          <NewBox>
            <div className='posts'>
              <span>게시글</span>
              <span className='count'>{user.posts.length}</span>
            </div>
            <div className='subscriber'>
              <span>구독글</span>
              <span className='count'>{user.subscribedPosts.length}</span>
            </div>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
