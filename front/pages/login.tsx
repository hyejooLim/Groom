import React, { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AppLayout from '../components/layouts/AppLayout';
import useInput from '../hooks/input';

const FormWrapper = styled(Form)`
  margin: 0;
  padding: 50px 80px 30px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
  box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);
  -webkit-box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 10px 8px 10px -2px rgba(0, 0, 0, 0.29);

  .input_form {
    border: 1px dashed #888;
    padding: 0 10px;
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
  background-color: #13a085;
  height: 35px;
  margin: 40px 0 50px 0;
  color: #fff;
  border-radius: 8px;
  font-size: 15px;
  border: 0;
  outline: 0;
  transition: all 0.2s ease-in;

  :hover {
    background-color: #0fc19e;
    color: #fff;
    transform: scale(1.03);
  }
`;

const SignupButton = styled(Button)`
  background-color: #c4c4c4;
  height: 36px;
  color: #fff;
  border-radius: 8px;
  border: 0;
  outline: 0;
  transition: all 0.2s ease-in;

  :hover {
    background-color: #ddd;
    color: #fff;
    transform: scale(1.03);
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
      <AppLayout>
        <Head>
          <title>groom | 로그인</title>
        </Head>
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FormWrapper onFinish={onSubmitForm}>
            <div className='input_form'>
              <UserOutlined style={{ marginRight: 10, fontSize: '20px' }} />
              <StyledInput type='email' value={email} onChange={onChangeEmail} placeholder='email' required />
            </div>
            <br />
            <div className='input_form'>
              <LockOutlined style={{ marginRight: 10, fontSize: '20px' }} />
              <StyledInput
                type='password'
                value={password}
                onChange={onChangePassword}
                placeholder='password'
                required
              />
            </div>
            <div>
              <LoginButton htmlType='submit'>로그인</LoginButton>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#888' }}>아직 계정이 없으신가요?</span>
              <Link href='/signup'>
                <a>
                  <SignupButton>회원가입</SignupButton>
                </a>
              </Link>
            </div>
          </FormWrapper>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
