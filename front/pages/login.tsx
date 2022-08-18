import React, { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useInput from '../hooks/common/input';
import { LoginWrapper, StyledForm, StyledInput, LoginButton, SignupButton } from '../styles/ts/pages/login';
import logo from '../public/Groom_Logo_No_Background.png';

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(async () => {
    const result = await signIn('credentials', {
      redirect: false, // 로그인 중 에러 발생 시 현재 화면 유지
      email,
      password,
    });

    if (result.error) {
      alert('로그인 실패하였습니다.');
      return;
    }

    toast.success('로그인 되었습니다.', {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
    });

    setTimeout(() => {
      Router.push('/');
    }, 3000);
  }, [email, password]);

  return (
    <>
      <Head>
        <title>Groom | 로그인</title>
      </Head>
      <LoginWrapper>
        <StyledForm onFinish={onSubmitForm}>
          <div className='logo'>
            <Link href='/'>
              <a>
                <Image src={logo} alt='groom_logo' width={140} height={60} />
              </a>
            </Link>
          </div>
          <div className='email input_form'>
            <UserOutlined className='icon' />
            <StyledInput type='email' value={email} onChange={onChangeEmail} placeholder='email' required />
          </div>
          <div className='password input_form'>
            <LockOutlined className='icon' />
            <StyledInput type='password' value={password} onChange={onChangePassword} placeholder='password' required />
          </div>
          <LoginButton htmlType='submit'>로그인</LoginButton>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0 -32px',
            }}
          >
            <span style={{ color: '#888' }}>아직 계정이 없으신가요?</span>
            <Link href='/signup'>
              <a>
                <SignupButton>회원가입</SignupButton>
              </a>
            </Link>
          </div>
        </StyledForm>
      </LoginWrapper>
      <ToastContainer />
    </>
  );
};

export default Login;
