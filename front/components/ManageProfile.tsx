import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Button, Card } from 'antd';

import useGetUser from '../hooks/query/useGetUser';
import { StyledCard } from '../styles/ts/components/ManageProfile';

const ManageProfile = () => {
  const { status } = useSession();
  const { data: user } = useGetUser();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/login');
    }
  }, [status]);

  const handleLogout = () => {
    if (confirm('로그인 후 이용하실 수 있습니다.')) {
      signOut();
    }
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
