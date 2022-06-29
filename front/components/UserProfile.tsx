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
  font-size: 14px;
`;

const LogoutButton = styled(Button)`
  background-color: #13a085;
  color: #fff;
  height: 38px;
  border-radius: 8px;
  border: 0;
  outline: 0;

  :hover {
    cursor: pointer;
    transform: scale(1.03);
    background-color: #13a085;
    color: #fff;
  }
`;

const UserProfile = () => {
  const [user, setUser] = useState({
    id: '1',
    name: '홍길동',
    email: 'hong@naver.com',
    posts: [
      {
        id: '4',
        title: '입국심사',
        content: '...',
        Comments: [],
        likeCount: 5,
        author: 'sandy',
        category: 'algorithm',
        authorId: '77',
        createdAt: '2022.06.12',
      },
      {
        id: '3',
        title: '거리두기 확인하기',
        content: '...',
        Comments: [],
        category: 'algorithm',
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.06.11',
      },
      {
        id: '2',
        title: '점프와 순간 이동',
        content: '...',
        Comments: [],
        category: 'algorithm',
        author: 'tomas',
        authorId: '25',
        createdAt: '2022.05.28',
      },
      {
        id: '1',
        title: '끝말잇기',
        content: '...',
        Comments: [],
        category: 'algorithm',
        author: 'jenny',
        authorId: '12',
        createdAt: '2022.05.16',
      },
    ],
    subscribers: ['2', '3', '4'], // 나를 구독하고 있는 유저 수
  });

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
            <span style={{ marginRight: 10 }}>게시글|{user.posts.length}</span>
            <span>구독자|{user.subscribers.length}</span>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton>로그아웃</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
