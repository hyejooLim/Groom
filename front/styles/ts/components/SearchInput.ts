import styled from 'styled-components';
import { Form, Input, Button, Menu, Dropdown } from 'antd';

export const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #475466;
  background: #fff;
  height: 58px;
  border-radius: 1px;
  margin-top: 10px;
`;

export const StyledForm = styled(Form)`
  width: 834px;
  height: 100%;
`;

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 100%;
`;

export const DropdownWrapper = styled.div`
  width: 81px;
  margin: 0 18px 0 46px;
  border-right: 1px solid #e0e5ee;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledInput = styled(Input)`
  width: 654px;
  border: 0;
  outline: none;
  font-size: 18px;
  background: none;
`;

export const SearchButton = styled(Button)`
  width: 52px;
  font-size: 18px;
  margin-right: -18px;
  background-color: transparent;

  :hover {
    color: #000;
  }
`;

export const OverrideMenu = styled(Menu)`
  & .ant-dropdown-menu-item-active {
    background-color: #f5f5f5 !important;
    color: #ff5544;
  }

  & .ant-dropdown-menu-item-selected {
    background-color: transparent;
    color: #ff5544;
  }
`;
