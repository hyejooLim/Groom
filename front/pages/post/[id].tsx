import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import PostCard from '../../components/PostCard';
import { PostItem } from '../../types';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<PostItem>({
    id: '10',
    title: '입국심사',
    content: '...',
    Comments: [
      {
        content: '좋은 글 보고 가요~',
        datetime: '2022.06.23',
        User: {
          id: '25',
          name: '토마스',
          email: 'tomas@naver.com',
        },
      },
      {
        content: '샌디님 오늘은 뭐하셨나요??',
        datetime: '2022.06.25',
        User: {
          id: '80',
          name: '민트',
          email: 'mint@naver.com',
        },
      },
    ],
    author: 'sandy',
    Category: { id: '1', name: 'algorithm' },
    authorId: '77',
    createdAt: '2022.06.12',
  });

  return (
    <AppLayout>
      <Head>
        <title>Groom | {id}번째 게시글</title>
      </Head>
      {post && <PostCard post={post} />}
    </AppLayout>
  );
};

export default Post;
