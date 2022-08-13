import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Editor from '../components/editor/Editor';
import * as ContentMode from '../constants/ContentMode';
import { PostItem } from '../types';

const Write = () => {
  const router = useRouter();
  const { post } = router.query;
  const parsedPost = post && (JSON.parse(post as string) as PostItem);

  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      router.replace('/login');
    }
  }, [status]);

  return <Editor post={parsedPost} mode={post ? ContentMode.EDIT : ContentMode.ADD} />;
};

export default Write;
