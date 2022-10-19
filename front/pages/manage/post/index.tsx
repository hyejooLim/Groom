import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../../components/layouts/ManageLayout';
import PostManageList from '../../../components/manage/PostManageList';
import PaginationContainer from '../../../components/common/PaginationContainer';
import { useGetUser } from '../../../hooks/query/user';
import SearchInput from '../../../components/manage/SearchInput';
import { MANAGE_PAGE_SIZE } from '../../../recoil/page';
import { isSearchManagePostsState, managePostsState, managePostsTitleState } from '../../../recoil/manage';
import { TitleWrapper, CloseButton } from '../../../styles/ts/common';

const ManagePost = () => {
  const { data: user } = useGetUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const [isSearch, setIsSearch] = useRecoilState(isSearchManagePostsState);
  const [managePosts, setManagePosts] = useRecoilState(managePostsState);
  const [managePostsTitle, setManagePostsTitle] = useRecoilState(managePostsTitleState);

  useEffect(() => {
    setManagePostsTitle('');

    if (localStorage.getItem('managePosts')) {
      const item = JSON.parse(localStorage.getItem('managePosts'));

      setIsSearch(item.isSearch);
      setManagePostsTitle(item.title);
      setManagePosts(item.posts);
    }
  }, [user?.posts]);

  const onChangePostList = useCallback(
    (e: any) => {
      setIsSearch(false);
      setManagePostsTitle(e.target.dataset.name);
      setCurrentPage(1);
      setFirstIndex(0);
      setLastIndex(MANAGE_PAGE_SIZE);

      const newPosts = user?.posts.filter((post) => post.categoryId === Number(e.target.dataset.id));
      setManagePosts(newPosts);

      const item = { posts: newPosts, title: e.target.dataset.name, isSearch: false };
      localStorage.setItem('managePosts', JSON.stringify(item));
    },
    [MANAGE_PAGE_SIZE, user?.posts]
  );

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {managePostsTitle ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CloseButton>
                <CloseCircleOutlined />
              </CloseButton>
              <span className='title text'>{managePostsTitle}</span>
              <span className='text'>{isSearch ? '검색결과' : '글'}</span>
            </div>
          ) : (
            <span className='text'>글 관리</span>
          )}
          <span className='count'>{managePosts?.length}</span>
        </TitleWrapper>
        <SearchInput
          // posts={user?.posts}
          // setIsSearch={setIsSearch} // useGetFilteredPosts에서 작성
          // setPosts={setManagePosts} // useGetFilteredPosts에서 작성
          placeholder='글'
        />
        <PostManageList
          posts={managePosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onChangePostList={onChangePostList}
        />
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={managePosts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManagePost;
