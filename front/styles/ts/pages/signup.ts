import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

export const SignupWrapper = styled.div`
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

export const StyledForm = styled(Form)`
  .input_form {
    margin-bottom: 20px;
  }
`;

export const InputWrapper = styled(Input)`
  width: 500px;
  height: 38px;
  margin-top: 5px;
  border: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  display: none;

  &.error {
    display: block;
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  width: 80px;
  height: 38px;
  font-size: 15px;
  border-radius: 10px;
  color: #fff;
  background-color: #13a085;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;

  :hover {
    color: #fff;
    background-color: #0fc19e;
    transform: scale(1.02);
  }

  :focus {
    color: #fff;
    background-color: #13a085;
  }

  &:disabled {
    background-color: #fff;

    :hover {
      background-color: #fff;
      transform: none;
    }
  }
`;
