import React, { FC, useState, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import PaginationContainer from '../components/PaginationContainer';
import { PostItem } from '../types';

const ListWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all; // ?
  height: 430px;

  & ul {
    border-top: 1px dotted #ddd;

    & li {
      padding: 12px 10px 9px;
      font-size: 14px;
      border-bottom: 1px dotted #ddd;

      & a:hover {
        color: #07a;
      }
    }
  }
`;

const PostInfo = styled.div`
  float: right;

  & span {
    color: #666;
  }
`;

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
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a style={{ fontSize: '15px' }}>
                  [{post.Category.name}] {post.title}
                </a>
              </Link>
              <PostInfo>
                <span style={{ marginRight: 8 }}>{post.author}</span>
                <span>{post.createdAt}</span>
              </PostInfo>
            </li>
          ))}
        </ul>
      </ListWrapper>
      <PaginationContainer pageSize={pageSize} current={currentPage} total={posts.length} onChange={onChangePage} />
    </>
  );
};

export default PostList;
