import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

import Editor from '../../components/editor/Editor';
import * as ContentMode from '../../constants/ContentMode';

const Write = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      Router.replace('/login');
    }
  }, [status]);

  return <Editor mode={ContentMode.ADD} />;
};

export default Write;
