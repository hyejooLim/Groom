import React, { FC, useCallback, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import BeatLoader from 'react-spinners/BeatLoader';

import { PostItem } from '../../types';
import { useSsrAllowedState } from '../../recoil/persist';
import { PAGE_SIZE } from '../../recoil/main';
import PaginationContainer from '../common/PaginationContainer';
import { ListWrapper, PostInfo } from '../../styles/ts/components/post/PostList';

interface PostListProps {
  posts: PostItem[];
  pathname: string;
  page: number;
  total: number;
  isLoading: boolean;
}

const PostList: FC<PostListProps> = ({ posts, pathname, page, total, isLoading }) => {
  const setSsrAllowed = useSsrAllowedState();
  useEffect(setSsrAllowed, [setSsrAllowed]);

  const onChangePage = useCallback((page: number) => {
    Router.push({ pathname, query: { page } });
  }, [pathname]);

  return (
    <>
      <ListWrapper>
        {isLoading ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <ul>
            {posts?.map((post) => (
              <li key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <a>
                    [{post.category?.name}] {post.title}
                  </a>
                </Link>
                <PostInfo>
                  <span style={{ marginRight: 8 }}>{post.author?.name}</span>
                  <span>{dayjs(post.createdAt).format('YYYY.MM.DD')}</span>
                </PostInfo>
              </li>
            ))}
          </ul>
        )}
      </ListWrapper>
      <PaginationContainer pageSize={PAGE_SIZE} current={page} total={total} onChange={onChangePage} />
    </>
  );
};

export default PostList;
