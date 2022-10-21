import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '../../components/layouts/AppLayout';
import Title from '../../components/common/Title';
import PostList from '../../components/post/PostList';
import { useSearchPosts } from '../../hooks/query/search';

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const { data: posts } = useSearchPosts(keyword as string);

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
