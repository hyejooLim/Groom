import React, { FC, useState, useCallback } from 'react';
import Link from 'next/link';

import PaginationContainer from '../components/PaginationContainer';
import { ListWrapper, PostInfo } from '../styles/ts/components/PostList';
import { PostItem } from '../types';

interface PostListProps {
  posts: PostItem[] | [];
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
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a>
                  [{post.category.name}] {post.title}
                </a>
              </Link>
              <PostInfo>
                <span style={{ marginRight: 8 }}>{post.author.name}</span>
                <span>{post.createdAt}</span>
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
