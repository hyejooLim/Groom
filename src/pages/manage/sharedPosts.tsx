import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { IconButton } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import ManageLayout from '@/components/layouts/ManageLayout';
import SearchInput from '@/components/manage/WrapSearchInput';
import SharedPostManageList from '@/components/manage/SharedPostManageList';
import { useGetUserSharedPosts } from '@/hooks/query/posts';
import { useSearchUserSharedPosts, useSearchCategoryOnUserSharedPosts } from '@/hooks/query/search';
import { manageSharedPostsState } from '@/recoil/manage';

const ManageSharedPosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const { data: userSharedPosts, isFetching: isFetchingSharedPosts } = useGetUserSharedPosts();
  const { isFetching: isFetchingSearch } = useSearchUserSharedPosts(String(searchKeyword), String(searchType));
  const { data: sharedInfo, isFetching: isFetchingSearchCategory } = useSearchCategoryOnUserSharedPosts(
    Number(categoryId),
  );

  const [manageSharedPosts, setManageSharedPosts] = useRecoilState(manageSharedPostsState);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManageSharedPosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({
      pathname: '/manage/sharedPosts',
      query: { searchKeyword, searchType },
    });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: '/manage/sharedPosts', query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 공유 글 관리</title>
        {searchKeyword && <title>Groom | 공유 글 관리 '{searchKeyword}'의 검색결과</title>}
        {sharedInfo && <title>Groom | 공유 글 관리 '{sharedInfo[0].post?.category?.name}' 카테고리의 글 목록</title>}
      </Head>
      <div className='-mt-5'>
        <div>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className='text-2xl'>공유 글 관리</span>
              <span className='ml-2 text-grey'>{userSharedPosts?.length}</span>
            </>
          ) : (
            <div className='flex items-center'>
              <Link href='/manage/sharedPosts'>
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
                  <span className='text-xl mr-1 text-accent font-bold'>
                    '{sharedInfo && sharedInfo[0].post.category.name}'
                  </span>
                  <span className='text-lg'>글</span>
                </>
              )}
              <span className='ml-2'>{manageSharedPosts?.length}</span>
            </div>
          )}
        </div>
        <SearchInput
          placeholder='공유 글'
          newSearchTypes={[{ key: 'sender', label: '공유자' }]}
          onSearch={onSearchInput}
        />
        <SharedPostManageList
          sharedPosts={manageSharedPosts ?? userSharedPosts}
          isFetching={isFetchingSearch || isFetchingSearchCategory || isFetchingSharedPosts}
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export default ManageSharedPosts;
