import React from 'react';
import { signOut, useSession } from 'next-auth/react';
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
    margin: 0 8px -1px 8px;
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
                <span>{session.user.name}λ</span>
              </a>
            </Link>
            <div style={{ marginTop: 5, color: '#888' }}>{session.user.email}</div>
          </InfoBox>
          <NewBox>
            <div className='posts'>
              <span>κ²μκΈ</span>
              <span className='count'>{session.user.posts ? session.user.posts.length : 0}</span>
            </div>
          </NewBox>
        </UserInfo>
      </InfoArea>
      <LogoutButton onClick={handleLogout}>λ‘κ·Έμμ</LogoutButton>
    </UserProfileWrapper>
  );
};

export default UserProfile;
