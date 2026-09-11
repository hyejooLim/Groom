import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import ManageLayout from '@/components/layouts/ManageLayout';
import PostManageList from '@/components/manage/PostManageList';
import WrapSearchInput from '@/components/manage/WrapSearchInput';
import { useGetUserSubscribedPosts } from '@/hooks/query/posts';
import { useSearchCategoryOnUserSubscribedPosts, useSearchUserSubscribedPosts } from '@/hooks/query/search';
import { useManageStore } from '@/stores/useManageStore';

const ManageSubscribedPosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const { data: userSubscribedPosts, isFetching: isFetchingPosts } = useGetUserSubscribedPosts();
  const { isFetching: isFetchingSearch } = useSearchUserSubscribedPosts(String(searchKeyword), String(searchType));
  const { data: category, isFetching: isFetchingSearchCategory } = useSearchCategoryOnUserSubscribedPosts(
    Number(categoryId),
  );

  const manageSubscribedPosts = useManageStore((state) => state.manageSubscribedPosts);
  const setManageSubscribedPosts = useManageStore((state) => state.setManageSubscribedPosts);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManageSubscribedPosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({
      pathname: '/manage/subscribedPosts',
      query: { searchKeyword, searchType },
    });
  };

  const onClickCategory = (id: number) => {
    Router.push({
      pathname: '/manage/subscribedPosts',
      query: { category: id },
    });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리</title>
        {searchKeyword && <title>Groom | 구독 글 관리 '{searchKeyword}'의 검색결과</title>}
        {categoryId && <title>Groom | 구독 글 관리 '{category?.name}' 카테고리의 글 목록</title>}
      </Head>
      <div className='-mt-5'>
        <div>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text-2xl'>구독 글 관리</span>
              <span className='ml-2 text-grey'>{userSubscribedPosts?.length}</span>
            </>
          ) : (
            <div className='flex items-center'>
              <Link href='/manage/subscribedPosts'>
                <IconButton>
                  <CancelOutlinedIcon />
                </IconButton>
              </Link>
              {searchKeyword && (
                <>
                  <span className='text-xl mr-1 text-accent font-bold'>'{searchKeyword}'</span>
                  <span className='text-lg'>검색결과</span>
                </>
              )}
              {categoryId && (
                <>
                  <span className='text-xl mr-1 text-accent font-bold'>'{category?.name}'</span>
                  <span className='text-lg'>글</span>
                </>
              )}
              <span className='ml-2'>{manageSubscribedPosts?.length}</span>
            </div>
          )}
        </div>
        <WrapSearchInput placeholder='구독 글' onSearch={onSearchInput} />
        <PostManageList
          posts={manageSubscribedPosts ?? userSubscribedPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingPosts}
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export default ManageSubscribedPosts;
