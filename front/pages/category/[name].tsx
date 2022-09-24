import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import useGetCategory from '../../hooks/query/useGetCategory';

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
      <PostList posts={category?.posts.filter((post) => post.isPublic)} />
    </AppLayout>
  );
};

export default Category;
