import React, { useState, useCallback, SubmitEvent } from 'react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { toast, ToastContainer } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { isLogInState } from '../recoil/auth';
import useInput from '../hooks/common/input';
import logo from '../public/Groom_Logo_No_Background.png';

const Login = () => {
  const router = useRouter();
  const { prevPathname } = router.query;

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const setIsLogIn = useSetRecoilState(isLogInState);

  const onSubmitForm = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);
      const result = await signIn('credentials', {
        redirect: false, // 로그인 중 에러 발생 시 현재 화면 유지
        email,
        password,
      });

      if (result.error) {
        alert(result.error);
        setIsLoading(false);
        return;
      }

      setIsLogIn(result.ok);

      toast.success('로그인 되었습니다.', {
        autoClose: 2000,
        position: 'top-right',
        hideProgressBar: true,
      });

      setTimeout(() => {
        prevPathname === 'signup' ? Router.push('/') : Router.back();
      }, 3000);
    },
    [email, password],
  );

  return (
    <>
      <Head>
        <title>Groom | 로그인</title>
      </Head>
      <div className='flex justify-center items-center h-full overflow-y-hidden bg-background'>
        <form className='flex bg-white flex-col items-center px-32 py-8 rounded-2xl shadow-lg' onSubmit={onSubmitForm}>
          <div className='mb-4'>
            <Link href='/'>
              <Image src={logo} alt='groom_logo' width={140} height={60} />
            </Link>
          </div>
          <TextField
            className='h-14 w-72'
            variant='standard'
            value={email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              },
            }}
            placeholder='email'
            disabled={isLoading}
            onChange={onChangeEmail}
            required
          />
          <TextField
            className='h-14 w-72'
            variant='standard'
            type={showPassword ? 'text' : 'password'}
            value={password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge='end'>
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            placeholder='password'
            disabled={isLoading}
            onChange={onChangePassword}
            required
          />
          <div className='flex justify-center mt-4 mb-8 w-full'>
            <Button type='submit' disabled={isLoading} variant='contained' className='!bg-primary w-10'>
              {isLoading ? (
                <Oval height={20} width={20} color='#fff' secondaryColor='#eee' strokeWidth={6} />
              ) : (
                '로그인'
              )}
            </Button>
          </div>
          <div className='flex gap-x-4'>
            <span>계정이 없으신가요?</span>
            <Link href='/signup'>
              <span className='hover:underline text-dark-grey'>회원가입</span>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
