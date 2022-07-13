import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';

import { user } from '../pages';

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

      :hover {
        box-shadow: none;
        border-color: #a5a5a5;
      }
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
  const handleLogout = () => {
    // logout
  };

  return (
    <StyledCard
      cover={
        <img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' width={214} height={200} />
      }
    >
      <div className='card_meta'>
        <Card.Meta title={`${user.name}님`} description={user.email} />
        <Button className='logout_btn' onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </StyledCard>
  );
};

export default ManageProfile;
