import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Editor from '../../components/editor/Editor';
import { useGetPost } from '../../hooks/query/post';
import * as ContentMode from '../../constants/ContentMode';

const Writes = () => {
  const router = useRouter();
  const { id } = router.query;

  const { status } = useSession();
  const { data: post } = useGetPost(Number(id));

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      router.replace('/login');
    }
  }, [status]);

  return post && <Editor post={post} mode={ContentMode.EDIT} />;
};

export default Writes;
