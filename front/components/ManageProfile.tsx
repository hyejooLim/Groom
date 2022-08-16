import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import { Button, Card } from 'antd';

import { StyledCard } from '../styles/ts/components/ManageProfile';

const ManageProfile = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      Router.replace('/');
    }
  }, [status]);

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
        {status === 'authenticated' ? (
          <>
            <Card.Meta title={`${session?.user.name}님`} description={session?.user.email} />
            <Button className='logout_btn' onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <div style={{ fontSize: '12px' }}>로그인 후 이용하실 수 있습니다.</div>
        )}
      </div>
    </StyledCard>
  );
};

export default ManageProfile;
