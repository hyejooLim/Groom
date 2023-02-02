import styled from 'styled-components';
import { Input, Button, Form } from 'antd';

export const SearchInputWrapper = styled.div`
  margin-top: 10px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  width: 760px;
  height: 50px;
  font-size: 17px;
  border-radius: 2px;
`;

export const SubmitButton = styled(Button)`
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #555;
  color: #fff;

  & .icon {
    margin-left: 12px;
    font-size: 15px;

    path {
      stroke: white;
    }
  }

  &:disabled {
    & .icon path {
      stroke: #b7b7b7;
    }
  }

  &:hover,
  &:focus,
  &:active {
    background-color: #777;
    color: #fff;
  }
`;
