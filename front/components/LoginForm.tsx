import React from 'react';
import Link from 'next/link';

import { LoginFormWrapper, LoginButton } from '../styles/ts/components/LoginForm';

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <p className='info'>지금 바로 Groom을 이용해 보세요.</p>
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
