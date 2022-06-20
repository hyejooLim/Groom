import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
  margin-bottom: 28px;
`;

const UserInfo = styled.div``;

const InfoBox = styled.div`
  margin-bottom: 20px;

  & span {
    color: #000;
    font-size: 18px;
    font-weight: 600;
  }
`;

const NewBox = styled.div`
  font-size: 14px;
`;

const LogoutButton = styled(Button)`
  background-color: #13a085;
  padding: 12px 20px;
  color: white;
  border-radius: 8px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '홍길동',
    email: 'hong@naver.com',
    posters: 10,
    followers: 3,
  });

  return (
    <UserProfileWrapper>
      <InfoArea>
        <Avatar size={80} icon={<UserOutlined />} />
        <UserInfo>
          <InfoBox>
            <Link href='/profile'>
              <a>
                <span>{user.name}님</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{user.email}</div>
          </InfoBox>
          <NewBox>
            <span style={{ marginRight: 10 }}>게시글 | {user.posters}</span>
            <span>팔로워 | {user.followers}</span>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton>로그아웃</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
