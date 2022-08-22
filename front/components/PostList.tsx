import React, { FC, useState, useCallback } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import PaginationContainer from '../components/PaginationContainer';
import { ListWrapper, PostInfo } from '../styles/ts/components/PostList';
import { PostItem } from '../types';

interface PostListProps {
  posts: PostItem[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  return (
    <>
      <ListWrapper>
        <ul>
          {posts?.slice(firstIndex, lastIndex).map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.id}`} as={`/post/${post.id}`}>
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
      </ListWrapper>
      <PaginationContainer pageSize={pageSize} current={currentPage} total={posts?.length} onChange={onChangePage} />
    </>
  );
};

export default PostList;
