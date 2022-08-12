import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AppLayout from '../components/layouts/AppLayout';
import Title from '../components/Title';
import PostList from '../components/PostList';
import { PostItem, UserType } from '../types';

export const user: UserType = {
  id: 77,
  name: '샌디',
  email: 'sandy@naver.com',
  password: '',
  comments: [],
  posts: [
    {
      id: 10,
      title: '입국심사',
      content: '...',
      tags: [],
      comments: [],
      likeCount: 0,
      category: { id: 1, name: 'algorithm' },
      author: null,
    },
  ],
  subscribedPosts: [],
};

export const mainPosts: PostItem[] = [
  {
    id: 10,
    title: '입국심사',
    content: '...',
    tags: [{ name: 'algorithm' }],
    comments: [],
    author: null,
    category: { id: 1, name: 'algorithm' },
    createdAt: '2022.06.12',
  },
];

const DEFAULT_TITLE = '전체 글';

const Home = () => {
  const router = useRouter();
  const { keyword, targetPosts } = router.query;
  const parsedPosts = targetPosts && (JSON.parse(targetPosts as string) as PostItem[]);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (parsedPosts) {
      setTitle(keyword as string);
      setPosts(parsedPosts);
    } else {
      setTitle(DEFAULT_TITLE);
      setPosts([]);
    }
  }, [keyword]);

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
