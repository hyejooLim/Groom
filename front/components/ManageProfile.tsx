import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 18px;

    .ant-card-meta-detail > div:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

const ManageProfile = () => {
  const [user, setUser] = useState({
    id: '1',
    name: '홍길동',
    email: 'hong@naver.com',
  });

  return (
    <StyledCard
      cover={
        <img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' width={214} height={200} />
      }
    >
      <Card.Meta title={`${user.name}님`} description={user.email} />
    </StyledCard>
  );
};

export default ManageProfile;
