import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import { categories } from '../../components/Category';

const Category = () => {
  const router = useRouter();
  const { id } = router.query;

  // dummy data
  const category = categories?.find((category) => category.id === Number(id));

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{category?.name}' 카테고리의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={category?.name} />
      </div>
      <PostList posts={category?.posts} />
    </AppLayout>
  );
};

export default Category;
