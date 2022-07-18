import React, { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import useInput from '../hooks/input';
import logo from '../public/Groom_Logo_No_Background.png';

const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  .logo {
    margin-bottom: 20px;
  }
`;

const StyledForm = styled(Form)`
  margin: 0;
  padding: 30px 110px;
  background: #fff;
  border-radius: 14px;
  text-align: center;
  box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);
  -webkit-box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);

  .input_form {
    display: flex;
    align-items: center;
    border: 1px dashed #888;
    padding: 0 10px;

    .icon {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .email {
    margin-bottom: 20px;
  }
`;

const StyledInput = styled(Input)`
  height: 40px;
  width: 260px;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  border: 0;

  :focus {
    box-shadow: none;
  }
`;

const LoginButton = styled(Button)`
  color: #fff;
  background-color: #13a085;
  width: 70px;
  height: 36px;
  font-size: 15px;
  margin: 40px 0;
  border-radius: 8px;
  transition: all 0.2s ease-in;

  :hover {
    color: #fff;
    background-color: #0fc19e;
    transform: scale(1.02);
  }
`;

const SignupButton = styled(Button)`
  color: #fff;
  background-color: #b0b0b0;
  width: 60px;
  height: 30px;
  font-size: 12px;
  border-radius: 8px;
  transition: all 0.2s ease-in;

  :hover {
    background-color: #c4c4c4;
    color: #fff;
    transform: scale(1.02);
  }
`;

const Login = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();

    // login...
    Router.replace('/');
  }, []);

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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#888' }}>아직 계정이 없으신가요?</span>
            <Link href='/signup'>
              <a>
                <SignupButton>회원가입</SignupButton>
              </a>
            </Link>
          </div>
        </StyledForm>
      </LoginWrapper>
    </>
  );
};

export default Login;
