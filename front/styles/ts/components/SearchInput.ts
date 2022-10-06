import styled from 'styled-components';
import { Form, Input, Button, Menu } from 'antd';

export const FormWrapper = styled.div`
  width: 100%;
  height: 58px;
  border-radius: 1px;
  margin-top: 10px;
  border: 1px solid #e0e5ee;
  background: #fafbfd;

  &.on {
    border: 1px solid #475466;
    background: #fff;
  }
`;

export const StyledForm = styled(Form)`
  width: 889px;
  height: 100%;
`;

export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  line-height: 100%;
  width: 100%;
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
  width: 640px;
  border: 0;
  outline: none;
  font-size: 18px;
  background: none;
`;

export const SearchButton = styled(Button)`
  font-size: 18px;
  background-color: transparent;
  margin-left: 10px;
  position: relative;
  top: 4px;

  &:disabled {
    background-color: inherit;

    &:hover {
      background-color: inherit;
    }
  }

  :hover {
    color: #000;
  }
`;

export const CloseButton = styled(Button)`
  color: #808080;
  font-size: 15px;
  margin-left: 17px;

  &:hover {
    color: #808080;
  }
`;

export const ShowInputButton = styled(Button)`
  width: 80px;
  font-size: 16px;
  position: absolute;
  right: 30px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;

  & .icon {
    margin-left: 10px;
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
