import React, { FC, useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';
import BeatLoader from 'react-spinners/BeatLoader';

import { PostItem } from '../../types';
import { PAGE_SIZE } from '../../recoil/main';
import PaginationContainer from '../common/PaginationContainer';

interface PostListProps {
  posts: PostItem[];
  pathname: string;
  currentPage: number;
  isLoading: boolean;
}

const PostList: FC<PostListProps> = ({ posts, pathname, currentPage, isLoading }) => {
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
    [PAGE_SIZE, pathname],
  );

  return (
    <>
      <div className='py-5 px-4 bg-white border border-light-grey min-h-[470px]'>
        {isLoading ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <ul>
            {posts?.slice(firstIndex, lastIndex).map((post) => (
              <li
                key={post.id}
                className='flex items-center justify-between text-lg p-4 border-b border-dotted border-light-grey'
              >
                <Link href={`/post/${post.id}`}>
                  [{post.category?.name}] {post.title}
                </Link>
                <div>
                  <span style={{ marginRight: 8 }}>{post.author?.name}</span>
                  <span>{dayjs(post.createdAt).format('YYYY.MM.DD')}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PaginationContainer pageSize={PAGE_SIZE} current={currentPage} total={posts?.length} onChange={onChangePage} />
    </>
  );
};

export default PostList;
