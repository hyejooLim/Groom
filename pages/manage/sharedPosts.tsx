import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import SearchInput from '../../components/manage/WrapSearchInput';
import SharedPostManageList from '../../components/manage/SharedPostManageList';
import { useGetUserSharedPosts } from '../../hooks/query/posts';
import { useSearchUserSharedPosts, useSearchCategoryOnUserSharedPosts } from '../../hooks/query/search';
import { manageSharedPostsState } from '../../recoil/manage';
import getUser from '../../apis/user/getUser';
import getUserSharedPosts from '../../apis/posts/getUserSharedPosts';
import searchCategoryOnUserSharedPosts from '../../apis/search/searchCategoryOnUserSharedPosts';
import searchUserSharedPosts from '../../apis/search/searchUserSharedPosts';
import { CloseButton, TitleWrapper } from '../../styles/ts/common';

const ManageSharedPosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const {
    data: userSharedPosts,
    isLoading: isLoadingSharedPosts,
    isFetching: isFetchingSharedPosts,
  } = useGetUserSharedPosts();
  const { isLoading: isLoadingSearch, isFetching: isFetchingSearch } = useSearchUserSharedPosts(
    String(searchKeyword),
    String(searchType)
  );
  const { isLoading: isLoadingSearchCategory, isFetching: isFetchingSearchCategory } =
    useSearchCategoryOnUserSharedPosts(categoryId ? Number(categoryId) : undefined);

  const [manageSharedPosts, setManageSharedPosts] = useRecoilState(manageSharedPostsState);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManageSharedPosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({ pathname: '/manage/sharedPosts', query: { searchKeyword, searchType } });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: '/manage/sharedPosts', query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 공유 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text'>공유 글 관리</span>
              <span className='count'>{userSharedPosts?.length}</span>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/manage/sharedPosts'>
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
              {categoryId && manageSharedPosts?.length > 0 && (
                <>
                  <span className='text title'>'{manageSharedPosts[0]?.post?.category?.name}'</span>
                  <span className='text'>글</span>
                </>
              )}
              <span className='count'>{manageSharedPosts?.length}</span>
            </div>
          )}
        </TitleWrapper>
        <SearchInput
          placeholder='공유 글'
          newSearchTypes={[{ key: 'sender', label: '공유자' }]}
          onSearch={onSearchInput}
        />
        <SharedPostManageList
          sharedPosts={manageSharedPosts ?? userSharedPosts}
          isLoading={isLoadingSearch || isLoadingSearchCategory || isLoadingSharedPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingSharedPosts}
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category: categoryId, searchKeyword, searchType } = context.query;
  const queryClient = new QueryClient();

  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['userSharedPosts'], getUserSharedPosts),
    categoryId &&
      queryClient.prefetchQuery(['userSharedPosts', 'category', Number(categoryId)], () =>
        searchCategoryOnUserSharedPosts(Number(categoryId))
      ),
    searchKeyword &&
      queryClient.prefetchQuery(['userSharedPosts', searchKeyword, searchType], () =>
        searchUserSharedPosts(String(searchKeyword), String(searchType))
      ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ManageSharedPosts;
