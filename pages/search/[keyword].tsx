import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import { keywordState } from '../../recoil/main';
import { useSearchPosts } from '../../hooks/query/search';

const Search = () => {
  const router = useRouter();
  const { keyword, page } = router.query;
  const setKeyword = useSetRecoilState(keywordState);

  const { data: posts, isFetching } = useSearchPosts(keyword as string);

  useEffect(() => {
    setKeyword(keyword as string);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{keyword}'의 검색결과</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={keyword as string} />
      </div>
      <PostList posts={posts} pathname={`/search/${keyword}`} currentPage={Number(page)} isFetching={isFetching} />
    </AppLayout>
  );
};

export default Search;
