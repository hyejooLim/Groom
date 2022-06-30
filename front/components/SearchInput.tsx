import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Menu, Dropdown } from 'antd';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from '../hooks/input';

const FormWrapper = styled.div`
  width: 100%;
  border: 1px solid #475466;
  background: #fff;
  height: 52px;
  border-radius: 1px;
  margin-top: 10px;
`;

const InnerWrapper = styled.div`
  display: flex;

  .ant-input:focus {
    border-color: none;
    box-shadow: none;
  }
`;

const DropdownWrapper = styled.div`
  float: left;
  width: 81px;
  height: 23px;
  margin: 3px 18px 0 0;
  border-right: 1px solid #e0e5ee;

  & a {
    color: #000;
  }
`;

const SearchButton = styled(Button)`
  border: 0;
  outline: none;
  font-size: 18px;
  margin: 0 10px 0 60px;
  background-color: transparent;

  :hover {
    color: #000;
  }
`;

const OverrideMenu = styled(Menu)`
  & .ant-dropdown-menu-item-active {
    background-color: #f5f5f5 !important;
    color: #ff5544;
  }

  & .ant-dropdown-menu-item-selected {
    background-color: transparent;
    color: #ff5544;
  }
`;

const SearchInput = () => {
  const menu = (
    <OverrideMenu
      selectable
      defaultSelectedKeys={['0']}
      items={[
        {
          key: '0',
          label: <span>제목</span>,
        },
        {
          key: '1',
          label: <span>내용</span>,
        },
        {
          key: '2',
          label: <span>태그</span>,
        },
      ]}
    />
  );
  const [value, onChangeValue] = useInput('');
  const [searchType, setSearchType] = useState();
  const [openMenu, setOpenMenu] = useState(false);

  const onSubmitInput = useCallback(() => {}, []);

  return (
    <FormWrapper>
      <Form style={{ width: '834px', float: 'right', margin: '10px 29px 0 0' }} onFinish={onSubmitInput}>
        <InnerWrapper>
          <DropdownWrapper>
            <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: '100px' }}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMenu((prev) => !prev);
                }}
              >
                <span style={{ fontSize: '13px', margin: '0 24px 0 -10px' }}>제목</span>
                {openMenu ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              </a>
            </Dropdown>
          </DropdownWrapper>
          <Input
            style={{ width: '654px', border: 0, outline: 'none', fontSize: '15px', background: 'none' }}
            type='text'
            value={value}
            onChange={onChangeValue}
            placeholder='글 관리에서 검색합니다.'
          />
          <SearchButton htmlType='submit' disabled={!value || !value.trim()}>
            <SearchOutlined />
          </SearchButton>
        </InnerWrapper>
      </Form>
    </FormWrapper>
  );
};

export default SearchInput;
