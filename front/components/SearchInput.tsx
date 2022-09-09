import React, { useState, useCallback, MouseEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from '../hooks/common/input';
import useGetTags from '../hooks/query/useGetTags';
import { isSearchState, managePostsState, manageTitleState } from '../recoil/posts';
import { PostItem } from '../types';
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
  const { data: tags } = useGetTags();

  const [keyword, onChangeKeyword] = useInput('');
  const [searchType, setSearchType] = useState({ key: searchTypeItem[0].key, label: searchTypeItem[0].label });
  const [openMenu, setOpenMenu] = useState(false);

  const [managePosts, setManagePosts] = useRecoilState(managePostsState);
  const setIsSearch = useSetRecoilState(isSearchState);
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

    const keywordRegex = new RegExp(keyword, 'gi');

    if (searchType.key === '0') {
      // 제목
      const filteredPosts = managePosts.filter((post: PostItem) => keywordRegex.test(post.title));
      setManagePosts(filteredPosts);
    } else if (searchType.key === '1') {
      // 내용
      const filteredPosts = managePosts.filter((post: PostItem) => keywordRegex.test(post.content));
      setManagePosts(filteredPosts);
    } else if (searchType.key === '2') {
      // 태그
      const matchedTag = tags.find((tag) => keyword === tag.name);
      setManagePosts(matchedTag.posts);
    }
  }, [keyword, searchType, managePosts]);

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
                <span style={{ fontSize: '13px', margin: '0 24px 0 -10px' }}>{searchType.label}</span>
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
