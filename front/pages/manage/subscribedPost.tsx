import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/manage/PostManageList';
import PaginationContainer from '../../components/common/PaginationContainer';
import { useGetUser } from '../../hooks/query/user';
import SearchInput from '../../components/manage/SearchInput';
import { TitleWrapper, CloseButton } from '../../styles/ts/common';
import {
  isSearchManageSubscribedPostsState,
  manageSubscribedPostsState,
  manageSubscribedPostsTitleState,
} from '../../recoil/manage';

const pageSize = 5;

const ManageSubscribedPost = () => {
  const { data: user } = useGetUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [isSearch, setIsSearch] = useRecoilState(isSearchManageSubscribedPostsState);
  const [manageSubscribedPosts, setManageSubscribedPosts] = useRecoilState(manageSubscribedPostsState);
  const [manageSubscribedPostsTitle, setManageSubscribedPostsTitle] = useRecoilState(manageSubscribedPostsTitleState);

  useEffect(() => {
    setManageSubscribedPostsTitle('');

    if (localStorage.getItem('manageSubscribedPosts')) {
      const item = JSON.parse(localStorage.getItem('manageSubscribedPosts'));

      setIsSearch(item.isSearch);
      setManageSubscribedPostsTitle(item.title);
      setManageSubscribedPosts(item.posts);
    }
  }, [user?.subscribedPosts]);

  const onLoadMainPosts = useCallback(() => {
    setIsSearch(false);
    setManageSubscribedPostsTitle('');
    setManageSubscribedPosts(user.subscribedPosts);

    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(pageSize);

    localStorage.removeItem('manageSubscribedPosts');
  }, [user, pageSize]);

  const onChangePostList = useCallback(
    (e: any) => {
      setIsSearch(false);
      setManageSubscribedPostsTitle(e.target.dataset.name);
      setCurrentPage(1);
      setFirstIndex(0);
      setLastIndex(pageSize);

      const newPosts = user?.subscribedPosts.filter((post) => post.categoryId === Number(e.target.dataset.id));
      setManageSubscribedPosts(newPosts);

      const item = { posts: newPosts, title: e.target.dataset.name, isSearch: false };
      localStorage.setItem('manageSubscribedPosts', JSON.stringify(item));
    },
    [pageSize, user?.subscribedPosts]
  );

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {manageSubscribedPostsTitle ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CloseButton onClick={onLoadMainPosts}>
                <CloseCircleOutlined />
              </CloseButton>
              <span className='title text'>{manageSubscribedPostsTitle}</span>
              <span className='text'>{isSearch ? '검색결과' : '글'}</span>
            </div>
          ) : (
            <span className='text'>구독 글 관리</span>
          )}
          <span className='count'>{manageSubscribedPosts?.length}</span>
        </TitleWrapper>
        <SearchInput
          posts={user?.subscribedPosts}
          setIsSearch={setIsSearch}
          setPosts={setManageSubscribedPosts}
          setTitle={setManageSubscribedPostsTitle}
          pageName='manageSubscribedPosts'
        />
        <PostManageList
          posts={manageSubscribedPosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onChangePostList={onChangePostList}
        />
      </div>
      <PaginationContainer
        pageSize={pageSize}
        current={currentPage}
        total={manageSubscribedPosts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManageSubscribedPost;
