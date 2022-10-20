import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRecoilValue } from 'recoil';

import ManageLayout from '../../../components/layouts/ManageLayout';
import PostManageList from '../../../components/manage/PostManageList';
import PaginationContainer from '../../../components/common/PaginationContainer';
import SearchInput from '../../../components/manage/SearchInput';
import { MANAGE_PAGE_SIZE } from '../../../recoil/page';
import { managePostsState } from '../../../recoil/manage';
import { TitleWrapper } from '../../../styles/ts/common';

const ManagePosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const managePosts = useRecoilValue(managePostsState);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  const onSearchInput = (keyword: string, searchType: string) => {
    Router.push(`/manage/posts/${keyword}/${searchType}`);
  };

  const onClickCategory = (id: number, name: string) => {
    Router.push({ pathname: `/manage/posts/category/${id}`, query: { name } }, `/manage/posts/category/${id}`);
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          <span className='text'>글 관리</span>
          <span className='count'>{managePosts?.length}</span>
        </TitleWrapper>
        <SearchInput placeholder='글' onSearch={onSearchInput} />
        <PostManageList
          posts={managePosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onClickCategory={onClickCategory}
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

export default ManagePosts;
