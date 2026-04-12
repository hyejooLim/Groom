import React, { ChangeEvent, KeyboardEvent, SubmitEvent, useCallback, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import TextField from '@mui/material/TextField';

import useInput from '../hooks/common/input';
import signup from '../apis/signup';
import logo from '../public/Groom_Logo_No_Background.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, onChangeName] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [isCapsLockPassword, setIsCapsLockPassword] = useState(false);
  const [isCapsLockPasswordCheck, setIsCapsLockPasswordCheck] = useState(false);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g;
    setEmailError(e.target.value.length > 0 && !regex.test(e.target.value));
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(0 < e.target.value.length && e.target.value.length < 8);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordCheckError(e.target.value !== password);
    },
    [password],
  );

  const onKeyUpPassword = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setIsCapsLockPassword(true) : setIsCapsLockPassword(false);
  };

  const onKeyUpPasswordCheck = (e: KeyboardEvent<HTMLInputElement>) => {
    e.getModifierState('CapsLock') ? setIsCapsLockPasswordCheck(true) : setIsCapsLockPasswordCheck(false);
  };

  const onSubmitForm = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        setIsLoading(true);

        await signup({ data: { email, password, name } });

        toast.success('회원가입이 완료되었습니다.', {
          autoClose: 2000,
          position: 'top-right',
          hideProgressBar: true,
        });

        setTimeout(() => {
          Router.push({ pathname: '/login', query: { prevPathname: 'signup' } }, '/login');
        }, 3000);
      } catch (error) {
        alert(error?.response?.data?.message);
        setIsLoading(false);
        console.error(error);
      }
    },
    [email, password, passwordCheck, name],
  );

  const buttonDisabled = () => {
    return (
      !email || !password || !passwordCheck || !name || emailError || passwordError || passwordCheckError || isLoading
    );
  };

  return (
    <>
      <Head>
        <title>Groom | 회원가입</title>
      </Head>
      <div className='h-full flex flex-col justify-center items-center overflow-y-hidden'>
        <Link href='/' className='mb-8'>
          <Image src={logo} alt='groom_logo' width={140} height={60} />
        </Link>
        <form className='flex flex-col items-center gap-y-4' onSubmit={onSubmitForm}>
          <div>
            <label htmlFor='user-name'>이름</label>
            <br />
            <TextField
              name='user-name'
              value={name}
              className='w-[340px]'
              placeholder='이름을 입력하세요.'
              onChange={onChangeName}
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <label htmlFor='user-email'>이메일</label>
            <br />
            <TextField
              name='user-email'
              value={email}
              className='w-[340px]'
              type='email'
              placeholder='이메일을 입력하세요.'
              onChange={onChangeEmail}
              disabled={isLoading}
              required
            />
            {emailError && <div className='text-error'>이메일 형식이 올바르지 않습니다.</div>}
          </div>
          <div>
            <label htmlFor='user-password'>비밀번호</label>
            <br />
            <TextField
              name='user-password'
              value={password}
              className='w-[340px]'
              type='password'
              placeholder='비밀번호를 입력하세요.'
              onChange={onChangePassword}
              onKeyUp={onKeyUpPassword}
              disabled={isLoading}
              required
            />
            {isCapsLockPassword && <div className='text-error'>CapsLock이 켜져 있습니다.</div>}
            {passwordError && !isCapsLockPassword && (
              <div className='text-error'>비밀번호는 8자리 이상이어야 합니다.</div>
            )}
          </div>
          <div>
            <label htmlFor='user-password-check'>비밀번호 확인</label>
            <br />
            <TextField
              name='user-password-check'
              value={passwordCheck}
              className='w-[340px]'
              type='password'
              placeholder='비밀번호를 입력하세요.'
              onChange={onChangePasswordCheck}
              onKeyUp={onKeyUpPasswordCheck}
              disabled={isLoading}
              required
            />
            {isCapsLockPasswordCheck && <div className='text-error'>CapsLock이 켜져 있습니다.</div>}
            {passwordCheckError && !isCapsLockPasswordCheck && (
              <div className='text-error'>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <button
            type='submit'
            className={`mt-8 text-white px-6 py-3 rounded-lg ${buttonDisabled() ? 'bg-light-grey cursor-not-allowed' : 'bg-primary cursor-pointer'}`}
            disabled={buttonDisabled()}
          >
            {isLoading ? (
              <Oval height={20} width={20} color='#d0d0d0' secondaryColor='#ddd' strokeWidth={6} />
            ) : (
              '가입하기'
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
