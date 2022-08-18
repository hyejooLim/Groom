import React from 'react';
import { signOut } from 'next-auth/react';
import { Button, Card } from 'antd';

import useGetUser from '../hooks/query/useGetUser';
import { StyledCard } from '../styles/ts/components/ManageProfile';

const ManageProfile = () => {
  const { data: user } = useGetUser();

  const handleLogout = () => {
    signOut();
  };

  return (
    <StyledCard
      cover={
        <img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' width={214} height={200} />
      }
    >
      <div className='card_meta'>
        <Card.Meta title={`${user?.name}님`} description={user?.email} />
        <Button className='logout_btn' onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </StyledCard>
  );
};

export default ManageProfile;
