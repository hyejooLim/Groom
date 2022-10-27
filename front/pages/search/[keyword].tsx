import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import searchPosts from '../../apis/search/searchPosts';
import getUser from '../../apis/user/getUser';
import getCategories from '../../apis/categories/getCategories';
import getVisitorsCount from '../../apis/count';
import { useSearchPosts } from '../../hooks/query/search';

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const { data: posts } = useSearchPosts(keyword as string);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{keyword}'의 검색결과</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={keyword as string} />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { keyword } = context.params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['visitorsCount'], getVisitorsCount),
    queryClient.prefetchQuery(['posts', 'keyword', String(keyword)], () => searchPosts(String(keyword))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Search;
