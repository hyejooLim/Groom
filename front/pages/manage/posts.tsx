import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/manage/PostManageList';
import PaginationContainer from '../../components/common/PaginationContainer';
import SearchInput from '../../components/manage/SearchInput';
import { MANAGE_PAGE_SIZE } from '../../recoil/page';
import { managePostsState } from '../../recoil/manage';
import { useGetUserPosts } from '../../hooks/query/posts';
import { useSearchUserPosts, useSearchCategoryOnUserPosts } from '../../hooks/query/search';
import getUser from '../../apis/user/getUser';
import getUserPosts from '../../apis/posts/getUserPosts';
import searchCategoryOnUserPosts from '../../apis/search/searchCategoryOnUserPosts';
import searchUserPosts from '../../apis/search/searchUserPosts';
import { TitleWrapper, CloseButton } from '../../styles/ts/common';

const ManagePosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(MANAGE_PAGE_SIZE);

  const { data: userPosts, refetch, isLoading: isLoadingPosts, isFetching: isFetchingPosts } = useGetUserPosts();
  const { isLoading: isLoadingSearch, isFetching: isFetchingSearch } = useSearchUserPosts(
    String(searchKeyword),
    String(searchType)
  );
  const {
    data: category,
    isLoading: isLoadingSearchCategory,
    isFetching: isFetchingSearchCategory,
  } = useSearchCategoryOnUserPosts(categoryId ? Number(categoryId) : undefined);

  const [managePosts, setManagePosts] = useRecoilState(managePostsState);

  const onInitPage = () => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(MANAGE_PAGE_SIZE);
  };

  useEffect(() => {
    onInitPage();

    if (Object.keys(router.query).length === 0) {
      refetch();
      setManagePosts(null);
    }
  }, [router.query]);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    onInitPage();
    Router.push({ pathname: '/manage/posts', query: { searchKeyword, searchType } });
  };

  const onClickCategory = (id: number) => {
    onInitPage();
    Router.push({ pathname: '/manage/posts', query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리</title>
        {searchKeyword && <title>Groom | 글 관리 '{searchKeyword}'의 검색결과</title>}
        {categoryId && <title>Groom | 글 관리 '{category?.name}' 카테고리의 글 목록</title>}
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text'>글 관리</span>
              <span className='count'>{managePosts?.length ?? userPosts?.length}</span>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/manage/posts'>
                <a>
                  <CloseButton>
                    <CloseCircleOutlined />
                  </CloseButton>
                </a>
              </Link>
              {searchKeyword && (
                <>
                  <span className='text title'>'{searchKeyword}'</span>
                  <span className='text'>검색결과</span>
                </>
              )}
              {categoryId && (
                <>
                  <span className='text title'>'{category?.name}'</span>
                  <span className='text'>글</span>
                </>
              )}
              <span className='count'>{managePosts?.length ?? userPosts?.length}</span>
            </div>
          )}
        </TitleWrapper>
        <SearchInput placeholder='글' onSearch={onSearchInput} />
        <PostManageList
          posts={managePosts ?? userPosts}
          isLoading={isLoadingSearch || isLoadingSearchCategory || isLoadingPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingPosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onClickCategory={onClickCategory}
        />
      </div>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={managePosts?.length ?? userPosts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category: categoryId, searchKeyword, searchType } = context.query;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['userPosts'], getUserPosts),
    categoryId &&
      queryClient.prefetchQuery(['userPosts', 'category', Number(categoryId)], () =>
        searchCategoryOnUserPosts(Number(categoryId))
      ),
    searchKeyword &&
      queryClient.prefetchQuery(['userPosts', searchKeyword, searchType], () =>
        searchUserPosts(String(searchKeyword), String(searchType))
      ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ManagePosts;