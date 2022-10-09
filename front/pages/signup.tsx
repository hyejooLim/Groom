import React, { ChangeEvent, useCallback, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';

import useInput from '../hooks/common/input';
import signup from '../apis/signup';
import * as S from '../styles/ts/pages/signup';
import logo from '../public/Groom_Logo_No_Background.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, onChangeName] = useInput('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

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
    [password]
  );

  const onSubmitForm = useCallback(async () => {
    try {
      const result = await signup({ data: { email, password, name } });

      if (result !== 'ok') {
        alert(result || '문제가 발생했습니다.');
        return;
      }

      toast.success('회원가입이 완료되었습니다.', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
        hideProgressBar: true,
      });

      setTimeout(() => {
        Router.push({ pathname: '/login', query: { prevPathname: 'signup' } }, '/login');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }, [email, password, passwordCheck, name]);

  return (
    <>
      <Head>
        <title>Groom | 회원가입</title>
      </Head>
      <S.SignupWrapper>
        <div className='logo'>
          <Link href='/'>
            <a>
              <Image src={logo} alt='groom_logo' width={140} height={60} />
            </a>
          </Link>
        </div>
        <S.StyledForm
          onFinish={onSubmitForm}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className='input_form'>
            <label htmlFor='user-email'>Email</label>
            <br />
            <S.InputWrapper
              name='user-email'
              value={email}
              type='email'
              placeholder='이메일을 입력하세요.'
              onChange={onChangeEmail}
              required
            />
            <S.ErrorMessage className={classNames({ error: emailError })}>
              이메일 형식이 올바르지 않습니다.
            </S.ErrorMessage>
          </div>
          <div className='input_form'>
            <label htmlFor='user-password'>Password</label>
            <br />
            <S.InputWrapper
              name='user-password'
              value={password}
              type='password'
              placeholder='비밀번호를 입력하세요.'
              onChange={onChangePassword}
              required
            />
            <S.ErrorMessage className={classNames({ error: passwordError })}>
              비밀번호는 8자리 이상이어야 합니다.
            </S.ErrorMessage>
          </div>
          <div className='input_form'>
            <label htmlFor='user-password-check'>Password Check</label>
            <br />
            <S.InputWrapper
              name='user-password-check'
              value={passwordCheck}
              type='password'
              placeholder='비밀번호를 입력하세요.'
              onChange={onChangePasswordCheck}
              required
            />
            <S.ErrorMessage className={classNames({ error: passwordCheckError })}>
              비밀번호가 일치하지 않습니다.
            </S.ErrorMessage>
          </div>
          <div className='input_form'>
            <label htmlFor='user-name'>Name</label>
            <br />
            <S.InputWrapper
              name='user-name'
              value={name}
              placeholder='이름을 입력하세요.'
              onChange={onChangeName}
              required
            />
          </div>
          <S.SubmitButton
            htmlType='submit'
            disabled={
              !email || !password || !passwordCheck || !name || emailError || passwordError || passwordCheckError
            }
          >
            가입하기
          </S.SubmitButton>
        </S.StyledForm>
      </S.SignupWrapper>
      <ToastContainer />
    </>
  );
};

export default Signup;
