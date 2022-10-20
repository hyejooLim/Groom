import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';

import ManageLayout from '../../../components/layouts/ManageLayout';
import PostManageList from '../../../components/manage/PostManageList';
import PaginationContainer from '../../../components/common/PaginationContainer';
import SearchInput from '../../../components/manage/SearchInput';
import { MANAGE_PAGE_SIZE } from '../../../recoil/page';
import { manageSubscribedPostsState } from '../../../recoil/manage';
import { TitleWrapper } from '../../../styles/ts/common';

const ManageSubscribedPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const [manageSubscribedPosts, setManageSubscribedPosts] = useRecoilState(manageSubscribedPostsState);

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
        <title>Groom | 구독 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          <span className='text'>구독 글 관리</span>
          <span className='count'>{manageSubscribedPosts?.length}</span>
        </TitleWrapper>
        <SearchInput placeholder='구독 글' />
        <PostManageList posts={manageSubscribedPosts} firstIndex={firstIndex} lastIndex={lastIndex} />
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
