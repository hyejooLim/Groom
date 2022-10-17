import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import { searchPostsState } from '../../recoil/posts';

const Keyword = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const searchPosts = useRecoilValue(searchPostsState);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{keyword}'의 검색결과</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={keyword as string} />
      </div>
      <PostList posts={searchPosts} />
    </AppLayout>
  );
};

export default Keyword;
