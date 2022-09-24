import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/Title';
import PostList from '../../components/PostList';
import { PostItem } from '../../types';

const Keyword = () => {
  const router = useRouter();
  const { keyword, targetPosts } = router.query;

  const posts: PostItem[] = targetPosts && JSON.parse(targetPosts as string);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{keyword}'의 검색결과</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={keyword as string} />
      </div>
      <PostList posts={posts?.filter((post) => post.isPublic)} />
    </AppLayout>
  );
};

export default Keyword;
