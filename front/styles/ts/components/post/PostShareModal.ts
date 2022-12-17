import styled from 'styled-components';
import { Input } from 'antd';

export const InputWrapper = styled(Input)`
  font-size: 18px;
  font-family: 'Nanum Godic';
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  display: none;

  &.error {
    float: left;
    display: block;
  }
`;

export const ShareButtonWrapper = styled.div`
  width: 100%;
  margin-top: 50px;

  & .share_btn {
    width: 100px;
    height: 40px;
    color: #fff;
    background-color: #13a085;
    border-radius: 6px;

    &:hover,
    &:focus {
      color: #fff;
      background-color: #0fc19e;
    }

    &:disabled {
      background-color: #ddd;
    }
  }
`;
