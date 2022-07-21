import React from 'react';
import { useRouter } from 'next/router';

import Editor from '../components/editor/components/Editor';
import * as ContentMode from '../components/editor/constants/ContentMode';
import { PostItem } from '../types';

const Write = () => {
  const router = useRouter();
  const { post } = router.query;
  const parsedPost = post && (JSON.parse(post as string) as PostItem);

  return <Editor post={parsedPost} mode={post ? ContentMode.EDIT : ContentMode.ADD} />;
};

export default Write;
