import React, { FC, useState, useCallback, MouseEvent } from 'react';
import { SetterOrUpdater } from 'recoil';
import { Dropdown } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { GrSearch } from 'react-icons/gr';
import classNames from 'classnames';

import useInput from '../../hooks/common/input';
import useGetTags from '../../hooks/query/tags';
import { PostItem, TagItem } from '../../types';
import * as S from '../../styles/ts/components/manage/SearchInput';

interface SearchInputProps {
  posts: PostItem[];
  setIsSearch: SetterOrUpdater<boolean>;
  setPosts: SetterOrUpdater<PostItem[]>;
  setTitle: SetterOrUpdater<string>;
  pageName: string;
}

const searchTypeList = [
  {
    key: 'TITLE',
    label: '제목',
  },
  {
    key: 'CONTENT',
    label: '내용',
  },
  {
    key: 'TAG',
    label: '태그',
  },
];

const SearchInput: FC<SearchInputProps> = ({ posts, setIsSearch, setPosts, setTitle, pageName }) => {
  const { data: tags } = useGetTags();

  const [keyword, onChangeKeyword, setKeyword] = useInput('');
  const [openMenu, setOpenMenu] = useState(false);
  const [searchType, setSearchType] = useState(searchTypeList[0]);
  const [showInput, setShowInput] = useState(false);

  const onClickLabel = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setSearchType({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  }, []);

  const menu = (
    <S.OverrideMenu
      selectable
      defaultSelectedKeys={['TITLE']}
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

  const onSetPosts = useCallback(() => {
    if (searchType.key === 'TITLE') {
      const filteredPosts = posts.filter((post: PostItem) => post.title.toLowerCase().includes(keyword.toLowerCase()));
      const item = { posts: filteredPosts, title: keyword, isSearch: true };

      setPosts(filteredPosts);
      localStorage.setItem(pageName, JSON.stringify(item));
    } else if (searchType.key === 'CONTENT') {
      const filteredPosts = posts.filter((post: PostItem) =>
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      const item = { posts: filteredPosts, title: keyword, isSearch: true };

      setPosts(filteredPosts);
      localStorage.setItem(pageName, JSON.stringify(item));
    } else if (searchType.key === 'TAG') {
      const matchedTag = tags?.find((tag: TagItem) => tag.name === keyword);
      const item = { posts: matchedTag?.posts, title: keyword, isSearch: true };

      setPosts(matchedTag?.posts);
      localStorage.setItem(pageName, JSON.stringify(item));
    }
  }, [keyword, searchType, pageName]);

  const onSubmitInput = useCallback(() => {
    setTitle(`'${keyword}'`);
    setIsSearch(true);
    setShowInput(false);
    onSetPosts();
  }, [keyword]);

  const onClickCloseButton = () => {
    setShowInput(false);
    setOpenMenu(false);
    setKeyword('');
    setSearchType(searchTypeList[0]);
  };

  return (
    <S.FormWrapper className={classNames({ on: showInput })}>
      <S.StyledForm onFinish={onSubmitInput}>
        <S.InnerWrapper>
          {showInput && (
            <>
              <S.DropdownWrapper>
                <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ width: '100px' }}>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenu((prev) => !prev);
                    }}
                  >
                    <span style={{ fontSize: '14px', margin: '0 24px 0 -10px' }}>{searchType.label}</span>
                    {openMenu ? (
                      <UpOutlined style={{ fontSize: '12px' }} />
                    ) : (
                      <DownOutlined style={{ fontSize: '12px' }} />
                    )}
                  </span>
                </Dropdown>
              </S.DropdownWrapper>
              <S.StyledInput
                type='text'
                value={keyword}
                onChange={onChangeKeyword}
                placeholder={(pageName === 'managePosts' ? '글' : '구독 글') + ' 관리에서 검색합니다.'}
              />
              <S.SearchButton htmlType='submit' disabled={!keyword || !keyword.trim()}>
                <GrSearch />
              </S.SearchButton>
              <S.CloseButton onClick={onClickCloseButton}>닫기</S.CloseButton>
            </>
          )}
          {!showInput && (
            <S.ShowInputButton onClick={() => setShowInput(true)}>
              <span>검색</span>
              <GrSearch className='icon' />
            </S.ShowInputButton>
          )}
        </S.InnerWrapper>
      </S.StyledForm>
    </S.FormWrapper>
  );
};

export default SearchInput;
