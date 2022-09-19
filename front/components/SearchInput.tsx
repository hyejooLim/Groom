import React, { useState, useCallback, MouseEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from '../hooks/common/input';
import useGetTags from '../hooks/query/useGetTags';
import useGetUser from '../hooks/query/useGetUser';
import { isSearchState, managePostsState, manageTitleState } from '../recoil/posts';
import { PostItem, TagItem } from '../types';
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
  const { data: user } = useGetUser();
  const { data: tags } = useGetTags();

  const [keyword, onChangeKeyword] = useInput('');
  const [openMenu, setOpenMenu] = useState(false);
  const [searchType, setSearchType] = useState({ key: searchTypeItem[0].key, label: searchTypeItem[0].label });

  const setIsSearch = useSetRecoilState(isSearchState);
  const setManagePosts = useSetRecoilState(managePostsState);
  const setManageTitle = useSetRecoilState(manageTitleState);

  const onClickLabel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSearchType({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  }, []);

  const menu = (
    <OverrideMenu
      selectable
      defaultSelectedKeys={['0']}
      items={searchTypeItem.map((item) => {
        return {
          key: item.key,
          label: (
            <button data-key={item.key} data-label={item.label} onClick={onClickLabel}>
              {item.label}
            </button>
          ),
        };
      })}
    />
  );

  const onSubmitInput = useCallback(() => {
    setManageTitle(`'${keyword}'`);
    setIsSearch(true);

    if (searchType.key === '0') {
      // 제목
      const filteredPosts = user?.posts.filter((post: PostItem) =>
        post.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setManagePosts(filteredPosts);
    } else if (searchType.key === '1') {
      // 내용
      const filteredPosts = user?.posts.filter((post: PostItem) =>
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      setManagePosts(filteredPosts);
    } else if (searchType.key === '2') {
      // 태그
      const matchedTag = tags?.find((tag: TagItem) => tag.name === keyword);
      setManagePosts(matchedTag?.posts);
    }
  }, [keyword, searchType]);

  return (
    <FormWrapper>
      <StyledForm onFinish={onSubmitInput}>
        <InnerWrapper>
          <DropdownWrapper>
            <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: '100px' }}>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMenu((prev) => !prev);
                }}
              >
                <span style={{ fontSize: '14px', margin: '0 24px 0 -10px' }}>{searchType.label}</span>
                {openMenu ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              </span>
            </Dropdown>
          </DropdownWrapper>

          <StyledInput type='text' value={keyword} onChange={onChangeKeyword} placeholder='글 관리에서 검색합니다.' />
          <SearchButton htmlType='submit' disabled={!keyword || !keyword.trim()}>
            <SearchOutlined />
          </SearchButton>
        </InnerWrapper>
      </StyledForm>
    </FormWrapper>
  );
};

export default SearchInput;
