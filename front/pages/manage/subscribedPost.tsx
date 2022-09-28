import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/PostManageList';
import PaginationContainer from '../../components/PaginationContainer';
import useGetUser from '../../hooks/query/useGetUser';
import SearchInput from '../../components/SearchInput';
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

  const onLoadMainPosts = useCallback(() => {
    setIsSearch(false);
    setManageSubscribedPostsTitle('');
    setManageSubscribedPosts(user.subscribedPosts);

    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(pageSize);
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
          placeholder='구독 글 관리에서 검색합니다.'
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
