import React, { useState } from 'react';
import { Card } from 'antd';

const ManageProfile = () => {
  const [user, setUser] = useState({
    id: '1',
    name: '홍길동',
    email: 'hong@naver.com',
  });

  return (
    <Card
      hoverable
      style={{ backgroundColor: '#fff', paddingBottom: '15px' }}
      cover={
        <img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' width={214} height={214} />
      }
    >
      <Card.Meta title={`${user.name}님`} description={user.email} style={{ margin: '15px 0 0 25px' }} />
    </Card>
  );
};

export default ManageProfile;
