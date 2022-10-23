import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';

import ManageLayout from '../../../components/layouts/ManageLayout';
import PostManageList from '../../../components/manage/PostManageList';
import PaginationContainer from '../../../components/common/PaginationContainer';
import SearchInput from '../../../components/manage/SearchInput';
import { MANAGE_PAGE_SIZE } from '../../../recoil/page';
import { manageSubscribedPostsState } from '../../../recoil/manage';
import { useGetUserSubscribedPosts } from '../../../hooks/query/posts';
import { TitleWrapper } from '../../../styles/ts/common';

const ManageSubscribedPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const { data: posts } = useGetUserSubscribedPosts();
  const manageSubscribedPosts = useRecoilValue(manageSubscribedPostsState);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  const onSearchInput = (keyword: string, searchType: string) => {
    Router.push(`/manage/subscribedPosts/${keyword}/${searchType}`);
  };

  const onClickCategory = (id: number, name: string) => {
    Router.push({ pathname: '/manage/subscribedPosts/category/[id]', query: { id, name } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          <span className='text'>구독 글 관리</span>
          <span className='count'>{manageSubscribedPosts?.length}</span>
        </TitleWrapper>
        <SearchInput placeholder='구독 글' onSearch={onSearchInput} />
        <PostManageList
          posts={manageSubscribedPosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onClickCategory={onClickCategory}
        />
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={manageSubscribedPosts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManageSubscribedPosts;
