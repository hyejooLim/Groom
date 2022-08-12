import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

const LoginFormWrapper = styled.div`
  height: 220px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const LoginButton = styled(Button)`
  color: #fff;
  background-color: #13a085;
  height: 52px;
  width: 258px;
  border-radius: 8px;

  &:hover {
    color: #fff;
    background-color: #13a085;
  }

  .text {
    font-size: 20px;
    font-weight: 800;
    margin-right: 20px;
  }
`;

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <p style={{ marginBottom: 30, fontSize: '15px' }}>지금 바로 Groom을 이용해 보세요.</p>
      <Link href='/login'>
        <a>
          <LoginButton>
            <span className='text'>Groom</span>
            로그인
          </LoginButton>
        </a>
      </Link>
    </LoginFormWrapper>
  );
};

export default LoginForm;
