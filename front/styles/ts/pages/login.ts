import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

export const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;

  .logo {
    margin-bottom: 20px;
  }
`;

export const StyledForm = styled(Form)`
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

export const StyledInput = styled(Input)`
  height: 40px;
  width: 260px;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  border: 0;

  :focus {
    box-shadow: none;
  }
`;

export const LoginButton = styled(Button)`
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

export const SignupButton = styled(Button)`
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
