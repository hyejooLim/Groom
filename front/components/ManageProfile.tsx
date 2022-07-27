import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Card } from 'antd';

const StyledCard = styled(Card)`
  .card_meta {
    display: flex;
    justify-content: space-between;

    .ant-card-meta {
      .ant-card-meta-title {
        font-size: 14px;
      }

      .ant-card-meta-description {
        font-size: 12px;
      }
    }

    .logout_btn {
      padding: 0;
      width: 58px;
      height: 24px;
      font-size: 12px;
      background-color: #fff;
      color: #13a085;
    }
  }

  .ant-card-body {
    padding: 18px;

    .ant-card-meta-detail > div:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

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
