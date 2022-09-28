import React, { FC, useState, useCallback, MouseEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';

import useInput from '../hooks/common/input';
import useGetTags from '../hooks/query/useGetTags';
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

interface SearchInputProps {
  posts: PostItem[];
  setIsSearch: SetterOrUpdater<boolean>;
  setPosts: SetterOrUpdater<PostItem[]>;
  setTitle: SetterOrUpdater<string>;
  pageName: string;
}

const searchTypeList = [
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

const SearchInput: FC<SearchInputProps> = ({ posts, setIsSearch, setPosts, setTitle, pageName }) => {
  const { data: tags } = useGetTags();

  const [keyword, onChangeKeyword] = useInput('');
  const [openMenu, setOpenMenu] = useState(false);
  const [searchType, setSearchType] = useState(searchTypeList[0]);

  const onClickLabel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSearchType({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  }, []);

  const menu = (
    <OverrideMenu
      selectable
      defaultSelectedKeys={['0']}
      items={searchTypeList.map((item) => {
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
    setTitle(`'${keyword}'`);
    setIsSearch(true);

    if (searchType.key === '0') {
      // 제목
      const filteredPosts = posts.filter((post: PostItem) => post.title.toLowerCase().includes(keyword.toLowerCase()));
      const item = { posts: filteredPosts, title: keyword, isSearch: true };

      setPosts(filteredPosts);
      localStorage.setItem(pageName, JSON.stringify(item));
    } else if (searchType.key === '1') {
      // 내용
      const filteredPosts = posts.filter((post: PostItem) =>
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      const item = { posts: filteredPosts, title: keyword, isSearch: true };

      setPosts(filteredPosts);
      localStorage.setItem(pageName, JSON.stringify(item));
    } else if (searchType.key === '2') {
      // 태그
      const matchedTag = tags?.find((tag: TagItem) => tag.name === keyword);
      const item = { posts: matchedTag?.posts, title: keyword, isSearch: true };

      setPosts(matchedTag?.posts);
      localStorage.setItem(pageName, JSON.stringify(item));
    }
  }, [keyword, searchType, pageName]);

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
          <StyledInput
            type='text'
            value={keyword}
            onChange={onChangeKeyword}
            placeholder={(pageName === 'managePosts' ? '글' : '구독 글') + ' 관리에서 검색합니다.'}
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
