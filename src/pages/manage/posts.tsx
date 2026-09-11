import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import ManageLayout from '@/components/layouts/ManageLayout';
import PostManageList from '@/components/manage/PostManageList';
import WrapSearchInput from '@/components/manage/WrapSearchInput';
import { useGetUserPosts } from '@/hooks/query/posts';
import { useSearchUserPosts, useSearchCategoryOnUserPosts } from '@/hooks/query/search';
import { useManageStore } from '@/stores/useManageStore';

const ManagePosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const { data: userPosts, isFetching: isFetchingPosts } = useGetUserPosts();
  const { isFetching: isFetchingSearch } = useSearchUserPosts(String(searchKeyword), String(searchType));
  const { data: category, isFetching: isFetchingSearchCategory } = useSearchCategoryOnUserPosts(Number(categoryId));

  const managePosts = useManageStore((state) => state.managePosts);
  const setManagePosts = useManageStore((state) => state.setManagePosts);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManagePosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({
      pathname: '/manage/posts',
      query: { searchKeyword, searchType },
    });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: '/manage/posts', query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리</title>
        {searchKeyword && <title>Groom | 글 관리 '{searchKeyword}'의 검색결과</title>}
        {categoryId && <title>Groom | 글 관리 '{category?.name}' 카테고리의 글 목록</title>}
      </Head>
      <div className='-mt-5'>
        <div className='flex items-center'>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text-2xl'>글 관리</span>
              <span className='ml-2 text-grey'>{userPosts?.length}</span>
            </>
          ) : (
            <div className='flex items-center'>
              <Link href='/manage/posts' className='mr-4'>
                <Button
                  sx={{
                    padding: 0,
                    fontSize: '24px',
                    color: '#2b2b2b',
                    minWidth: 'auto',
                  }}
                >
                  <HighlightOffOutlinedIcon />
                </Button>
              </Link>
              {searchKeyword && (
                <>
                  <span className='text-xl mr-1 text-[#ff5544]'>'{searchKeyword}'</span>
                  <span className='mx-1'>검색결과</span>
                </>
              )}
              {categoryId && (
                <>
                  <span className='text-xl mr-1 text-[#ff5544]'>'{category?.name}'</span>
                  <span className='mx-1'>글</span>
                </>
              )}
              <span className='ml-1 text-grey'>{managePosts?.length}</span>
            </div>
          )}
        </div>
        <WrapSearchInput placeholder='글' onSearch={onSearchInput} />
        <PostManageList
          posts={managePosts ?? userPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingPosts}
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export default ManagePosts;
