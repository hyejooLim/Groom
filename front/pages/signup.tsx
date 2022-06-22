import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/input';

const FormWrapper = styled(Form)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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
  border: 0;
  outline: none;
  padding: 12px 16px;
  font-size: 15px;
  border-radius: 10px;
  color: #fff;
  background-color: #13a085;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background-color: #0fc19e;
    transform: scale(1.03);
  }
`;

const regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g;

const Signup = () => {
  const [password, onChangePassword] = useInput('');
  const [name, onChangeName] = useInput('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!regex.test(e.target.value));
  }, [regex]);

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  // Error Check
  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      // signup...
      Router.replace('/');
    },
    [password, passwordCheck]
  );

  return (
    <>
      <Head>
        <title>groom | 회원가입</title>
      </Head>
      <AppLayout>
        <FormWrapper>
          <Form
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
              {emailError && <ErrorMessage>이메일 형식이 유효하지 않습니다.</ErrorMessage>}
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
          </Form>
        </FormWrapper>
      </AppLayout>
    </>
  );
};

export default Signup;
