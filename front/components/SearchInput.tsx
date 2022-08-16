import React, { useState, useCallback } from 'react';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from '../hooks/input';
import {
  FormWrapper,
  StyledForm,
  InnerWrapper,
  DropdownWrapper,
  StyledInput,
  SearchButton,
  OverrideMenu,
} from '../styles/ts/components/SearchInput';

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
      <StyledForm onFinish={onSubmitInput}>
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
          <StyledInput
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
      </StyledForm>
    </FormWrapper>
  );
};

export default SearchInput;
