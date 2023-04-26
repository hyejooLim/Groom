import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useSetRecoilState } from 'recoil';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import searchPosts from '../../apis/search/searchPosts';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import searchPostsPerPage from '../../apis/search/searchPostsPerPage';
import { keywordState } from '../../recoil/main';
import { useSearchPosts, useSearchPostsPerPage } from '../../hooks/query/search';

const Search = () => {
  const router = useRouter();
  const { keyword, page } = router.query;
  const setKeyword = useSetRecoilState(keywordState);

  const { data: posts } = useSearchPosts(keyword as string);
  const { data: postPerPage, isLoading } = useSearchPostsPerPage(String(keyword), page ? Number(page) : 1);

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
      <PostList
        posts={postPerPage}
        pathname={`/search/${keyword}`}
        total={posts?.length}
        page={Number(page)}
        isLoading={isLoading}
      />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { keyword } = context.params;

  const queryClient = new QueryClient();
  context.res.setHeader('Cache-Control', 'public, s-maxage=31536000, max-age=59');

  await Promise.all([
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['posts', 'keyword', String(keyword)], () => searchPosts(String(keyword))),
    queryClient.prefetchQuery(['posts', 'keyword', String(keyword), 'page', 1], () =>
      searchPostsPerPage(String(keyword), 1)
    ),
  ]);

  return {
    props: {
      session: await getSession({ req }),
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Search;
