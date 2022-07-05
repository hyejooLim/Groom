import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import { categories } from '../../components/Category';
import Title from '../../components/Title';
import PostList from '../../components/PostList';

const Category = () => {
  const router = useRouter();
  const { id } = router.query;

  // dummy data
  const category = categories.filter((category) => category.id === id);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{category[0]?.name}' 카테고리의 글 목록</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={category[0]?.name} />
      </div>
      <PostList posts={category[0].posts} />
    </AppLayout>
  );
};

export default Category;
