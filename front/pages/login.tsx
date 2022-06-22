import React, { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AppLayout from '../components/AppLayout';
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

const InputWrapper = styled(Input)`
  height: 40px;
  width: 260px;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  border: 0;
`;

const LoginButton = styled(Button)`
  background-color: #13a085;
  padding: 10px 16px;
  margin: 40px 0 50px 0;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  border: 0;
  outline: 0;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background-color: #0fc19e;
    transform: scale(1.03);
  }
`;

const SignupButton = styled(Button)`
  background-color: #c4c4c4;
  padding: 10px 14px;
  color: white;
  border-radius: 8px;
  border: 0;
  outline: 0;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background-color: #e0e0e0;
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
      <Head>
        <title>groom | 로그인</title>
      </Head>
      <AppLayout>
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FormWrapper onFinish={onSubmitForm}>
            <div className='input_form'>
              <UserOutlined style={{ marginRight: 10, fontSize: '20px' }} />
              <InputWrapper type='email' value={email} onChange={onChangeEmail} placeholder='email' required />
            </div>
            <br />
            <div className='input_form'>
              <LockOutlined style={{ marginRight: 10, fontSize: '20px' }} />
              <InputWrapper
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
