import React, { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';

import useInput from '../hooks/common/input';
import * as S from '../styles/ts/pages/login';
import logo from '../public/Groom_Logo_No_Background.png';

const Login = () => {
  const router = useRouter();
  const { prevPathname } = router.query;

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(async () => {
    const result = await signIn('credentials', {
      redirect: false, // 로그인 중 에러 발생 시 현재 화면 유지
      email,
      password,
    });

    if (result.error) {
      alert(result.error);
      return;
    }

    toast.success('로그인 되었습니다.', {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
    });

    setTimeout(() => {
      prevPathname === 'signup' ? Router.push('/') : Router.back();
    }, 3000);
  }, [email, password]);

  return (
    <>
      <Head>
        <title>Groom | 로그인</title>
      </Head>
      <S.LoginWrapper>
        <S.StyledForm onFinish={onSubmitForm}>
          <div className='logo'>
            <Link href='/'>
              <a>
                <Image src={logo} alt='groom_logo' width={140} height={60} />
              </a>
            </Link>
          </div>
          <div className='email input_form'>
            <UserOutlined className='icon' />
            <S.StyledInput type='email' value={email} onChange={onChangeEmail} placeholder='email' required />
          </div>
          <div className='password input_form'>
            <LockOutlined className='icon' />
            <S.StyledInput
              type='password'
              value={password}
              onChange={onChangePassword}
              placeholder='password'
              required
            />
          </div>
          <div className='buttons'>
            <S.LoginButton htmlType='submit'>로그인</S.LoginButton>
            <S.SignupButton>
              <Link href='/signup'>
                <a style={{ color: '#888' }}>
                  <span>아직 계정이 없으신가요?</span>
                  <span className='go_to_signup'>회원가입</span>
                </a>
              </Link>
            </S.SignupButton>
          </div>
        </S.StyledForm>
      </S.LoginWrapper>
      <ToastContainer />
    </>
  );
};

export default Login;
