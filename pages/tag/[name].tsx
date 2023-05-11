import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import getUser from '../../apis/user/getUser';
import getPostsIncludeTag from '../../apis/posts/getPostsIncludeTag';
import getCategories from '../../apis/categories/getCategories';
import { useGetPostsIncludeTag } from '../../hooks/query/posts';
import { productionURL } from '../../constants/URL';
import { TagItem } from '../../types';

const Tag = () => {
  const router = useRouter();
  const { name, page } = router.query;

  const { data: posts, isFetching } = useGetPostsIncludeTag(String(name));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{name}' 태그의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={name as string} />
      </div>
      <PostList posts={posts} pathname={`/tag/${name}`} currentPage={Number(page)} isFetching={isFetching} />
    </AppLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await axios.get(`${productionURL}/api/tags`);
  const tags = result.data as TagItem[];

  const paths = tags.map(({ name }) => ({ params: { name } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['user'], getUser),
    queryClient.prefetchQuery(['categories'], getCategories),
    queryClient.prefetchQuery(['posts', 'tag', String(name)], () => getPostsIncludeTag(String(name))),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export default Tag;
