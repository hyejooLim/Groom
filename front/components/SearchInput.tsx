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
  align-items: center;
`;

const DropdownWrapper = styled.div`
  width: 81px;
  height: 23px;
  margin: 3px 18px 0 46px;
  border-right: 1px solid #e0e5ee;

  & a {
    color: #000;
  }
`;

const SearchButton = styled(Button)`
  width: 52px;
  font-size: 18px;
  margin-right: -18px;
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

const searchTypeItem = [
  {
    key: '0',
    label: '제목',
  },
  {
    key: '1',
    label: '내용',
  },
  {
    key: '2',
    label: '태그',
  },
];

const SearchInput = () => {
  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  const [searchType, setSearchType] = useState(searchTypeItem[0].label);
  const [openMenu, setOpenMenu] = useState(false);

  const onClickLabel = useCallback((e: any) => {
    setSearchType(e.target.dataset.label);
  }, []);

  const menu = (
    <OverrideMenu
      selectable
      defaultSelectedKeys={['0']}
      items={searchTypeItem.map((item) => {
        return {
          key: item.key,
          label: (
            <button data-label={item.label} onClick={onClickLabel}>
              {item.label}
            </button>
          ),
        };
      })}
    />
  );

  const onSubmitInput = useCallback(() => {
    // const response = await axios.get(`/posts?keyword=${keyword}`);
    // mainPosts를 response로 바꿔주기
    setKeyword('');
  }, []);

  return (
    <FormWrapper>
      <Form style={{ width: '834px', margin: '10px 29px 0 0' }} onFinish={onSubmitInput}>
        <InnerWrapper>
          <DropdownWrapper>
            <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: '100px' }}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMenu((prev) => !prev);
                }}
              >
                <span style={{ fontSize: '13px', margin: '0 24px 0 -10px' }}>{searchType}</span>
                {openMenu ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              </a>
            </Dropdown>
          </DropdownWrapper>
          <Input
            style={{ width: '654px', border: 0, outline: 'none', fontSize: '15px', background: 'none' }}
            type='text'
            value={keyword}
            onChange={onChangeKeyword}
            placeholder='글 관리에서 검색합니다.'
          />
          <SearchButton htmlType='submit' disabled={!keyword || !keyword.trim()}>
            <SearchOutlined />
          </SearchButton>
        </InnerWrapper>
      </Form>
    </FormWrapper>
  );
};

export default SearchInput;
