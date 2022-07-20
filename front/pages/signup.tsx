import React, { ChangeEvent, useCallback, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useInput from '../hooks/input';
import logo from '../public/Groom_Logo_No_Background.png';
import signup from '../api/signup';

const SignupWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  .logo {
    margin-bottom: 40px;
  }
`;

const StyledForm = styled(Form)`
  .input_form {
    margin-bottom: 20px;
  }
`;

const InputWrapper = styled(Input)`
  width: 500px;
  height: 38px;
  margin-top: 5px;
  border: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
  width: 80px;
  height: 38px;
  font-size: 15px;
  border-radius: 10px;
  color: #fff;
  background-color: #13a085;
  transition: all 0.2s ease-in;

  :hover {
    color: #fff;
    background-color: #0fc19e;
    transform: scale(1.02);
  }
`;

const regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, onChangePassword] = useInput('');
  const [name, onChangeName] = useInput('');

  const [emailError, setEmailError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);

      if (!e.target.value || !e.target.value.trim()) {
        setEmailError(false);
      } else {
        setEmailError(!regex.test(e.target.value));
      }
    },
    [regex]
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmitForm = useCallback(async () => {
    try {
      if (password !== passwordCheck) {
        setPasswordError(true);
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const result = await signup({ data: { email, password, name } });

      if (!result.ok) {
        const json = await result.json();
        alert(json.message || '문제가 발생했습니다.');
        return;
      }

      toast.success('회원가입이 완료되었습니다.', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
        hideProgressBar: true,
      });

      setTimeout(() => {
        Router.push('/login');
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
      <SignupWrapper>
        <div className='logo'>
          <Link href='/'>
            <a>
              <Image src={logo} alt='groom_logo' width={140} height={60} />
            </a>
          </Link>
        </div>
        <StyledForm
          onFinish={onSubmitForm}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className='input_form'>
            <label htmlFor='user-email'>Email</label>
            <br />
            <InputWrapper
              name='user-email'
              value={email}
              type='email'
              placeholder='이메일을 입력하세요.'
              required
              onChange={onChangeEmail}
            />
            {emailError && <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>}
          </div>
          <div className='input_form'>
            <label htmlFor='user-password'>Password</label>
            <br />
            <InputWrapper
              name='user-password'
              value={password}
              type='password'
              placeholder='비밀번호를 입력하세요.'
              required
              onChange={onChangePassword}
            />
          </div>
          <div className='input_form'>
            <label htmlFor='user-password-check'>Password Check</label>
            <br />
            <InputWrapper
              name='user-password-check'
              value={passwordCheck}
              type='password'
              placeholder='비밀번호를 입력하세요.'
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>
          <div className='input_form'>
            <label htmlFor='user-name'>Name</label>
            <br />
            <InputWrapper
              name='user-name'
              value={name}
              placeholder='이름을 입력하세요.'
              required
              onChange={onChangeName}
            />
          </div>
          <SubmitButton htmlType='submit'>가입하기</SubmitButton>
        </StyledForm>
      </SignupWrapper>
      <ToastContainer />
    </>
  );
};

export default Signup;
