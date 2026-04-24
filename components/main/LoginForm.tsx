import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const LoginForm = () => {
  return (
    <div className='flex flex-col h-60 px-4 justify-center'>
      <p className='mb-8 text-lg'>지금 바로 Groom을 이용해 보세요.</p>
      <Link href='/login'>
        <Button fullWidth variant='contained' size='large' className='!bg-primary !text-white'>
          <span className='text-xl font-bold mr-5 normal-case'>Groom</span>
          로그인
        </Button>
      </Link>
    </div>
  );
};

export default LoginForm;
