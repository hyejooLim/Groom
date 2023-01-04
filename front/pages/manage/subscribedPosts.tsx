import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useRecoilState } from 'recoil';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/manage/PostManageList';
import WrapSearchInput from '../../components/manage/WrapSearchInput';
import { manageSubscribedPostsState } from '../../recoil/manage';
import { useGetUserSubscribedPosts } from '../../hooks/query/posts';
import { useSearchCategoryOnUserSubscribedPosts, useSearchUserSubscribedPosts } from '../../hooks/query/search';
import getUser from '../../apis/user/getUser';
import getUserSubscribedPosts from '../../apis/posts/getUserSubscribedPosts';
import searchCategoryOnUserSubscribedPosts from '../../apis/search/searchCategoryOnUserSubscribedPosts';
import searchUserSubscribedPosts from '../../apis/search/searchUserSubscribedPosts';
import { TitleWrapper, CloseButton } from '../../styles/ts/common';

const ManageSubscribedPosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const {
    data: userSubscribedPosts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useGetUserSubscribedPosts();
  const { isLoading: isLoadingSearch, isFetching: isFetchingSearch } = useSearchUserSubscribedPosts(
    String(searchKeyword),
    String(searchType)
  );
  const {
    data: category,
    isLoading: isLoadingSearchCategory,
    isFetching: isFetchingSearchCategory,
  } = useSearchCategoryOnUserSubscribedPosts(categoryId ? Number(categoryId) : undefined);

  const [manageSubscribedPosts, setManageSubscribedPosts] = useRecoilState(manageSubscribedPostsState);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManageSubscribedPosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({ pathname: '/manage/subscribedPosts', query: { searchKeyword, searchType } });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: '/manage/subscribedPosts', query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리</title>
        {searchKeyword && <title>Groom | 구독 글 관리 '{searchKeyword}'의 검색결과</title>}
        {categoryId && <title>Groom | 구독 글 관리 '{category?.name}' 카테고리의 글 목록</title>}
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text'>구독 글 관리</span>
              <span className='count'>{userSubscribedPosts?.length}</span>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/manage/subscribedPosts'>
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
              <span className='count'>{manageSubscribedPosts?.length}</span>
            </div>
          )}
        </TitleWrapper>
        <WrapSearchInput placeholder='구독 글' onSearch={onSearchInput} />
        <PostManageList
          posts={manageSubscribedPosts ?? userSubscribedPosts}
          isLoading={isLoadingSearch || isLoadingSearchCategory || isLoadingPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingPosts}
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category: categoryId, searchKeyword, searchType } = context.query;
  const queryClient = new QueryClient();

  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=31536000');

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['userSubscribedPosts'], getUserSubscribedPosts),
    categoryId &&
      queryClient.prefetchQuery(['userSubscribedPosts', 'category', Number(categoryId)], () =>
        searchCategoryOnUserSubscribedPosts(Number(categoryId))
      ),
    searchKeyword &&
      queryClient.prefetchQuery(['userSubscribedPosts', searchKeyword, searchType], () =>
        searchUserSubscribedPosts(String(searchKeyword), String(searchType))
      ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ManageSubscribedPosts;
