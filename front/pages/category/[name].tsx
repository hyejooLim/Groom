import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import useGetCategory from '../../hooks/query/useGetCategory';
import { getPublicAndPublishedPosts } from '../../lib/posts';

const Category = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data: category } = useGetCategory(name as string);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{category?.name}' 카테고리의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={category?.name} />
      </div>
      {category?.posts && <PostList posts={getPublicAndPublishedPosts(category.posts)} />}
    </AppLayout>
  );
};

export default Category;
