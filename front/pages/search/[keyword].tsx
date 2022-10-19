import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import { useGetFilteredMainPosts } from '../../hooks/query/posts';

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const { data: posts } = useGetFilteredMainPosts(keyword as string);

  return (
    <AppLayout>
      <Head>
        <title>Groom | '{keyword}'의 검색결과</title>
      </Head>
      <div style={{ textAlign: 'center' }}>
        <Title title={keyword as string} />
      </div>
      <PostList posts={posts} />
    </AppLayout>
  );
};

export default Search;
