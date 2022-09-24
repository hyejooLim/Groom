import React from 'react';
import { useRecoilValue } from 'recoil';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import { publicPostsState } from '../recoil/posts';

const Home = () => {
  const publicPosts = useRecoilValue(publicPostsState);

  return (
    <AppLayout>
      <div style={{ textAlign: 'center' }}>
        <Title title='전체 글' />
      </div>
      <PostList posts={publicPosts} />
    </AppLayout>
  );
};

export default Home;
