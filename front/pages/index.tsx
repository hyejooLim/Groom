import React, { useState } from 'react';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import useGetPosts from '../hooks/query/useGetPosts';

const DEFAULT_TITLE = '전체 글';

const Home = () => {
  const { data: posts } = useGetPosts();
  const [title, setTitle] = useState(DEFAULT_TITLE);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title={title} />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export default Home;
