import React, { FC, useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import BeatLoader from 'react-spinners/BeatLoader';

import { PostItem } from '../../types';
import { PAGE_SIZE } from '../../recoil/main';
import PaginationContainer from '../common/PaginationContainer';
import { ListWrapper, PostInfo } from '../../styles/ts/components/post/PostList';

interface PostListProps {
  posts: PostItem[];
  pathname: string;
  currentPage: number;
  isFetching: boolean;
}

const PostList: FC<PostListProps> = ({ posts, pathname, currentPage, isFetching }) => {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(PAGE_SIZE);

  useEffect(() => {
    if (currentPage) {
      setFirstIndex((currentPage - 1) * PAGE_SIZE);
      setLastIndex(currentPage * PAGE_SIZE);
    } else {
      setFirstIndex(0);
      setLastIndex(PAGE_SIZE);
    }
  }, [currentPage, PAGE_SIZE]);

  const onChangePage = useCallback(
    (page: number) => {
      Router.push({ pathname, query: { page } });
    },
    [PAGE_SIZE, pathname]
  );

  return (
    <>
      <ListWrapper>
        {isFetching ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <ul>
            {posts?.slice(firstIndex, lastIndex).map((post) => (
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
      <PaginationContainer pageSize={PAGE_SIZE} current={currentPage} total={posts?.length} onChange={onChangePage} />
    </>
  );
};

export default PostList;
