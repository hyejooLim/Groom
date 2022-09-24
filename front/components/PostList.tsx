import React, { FC, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import dayjs from 'dayjs';

import { PostItem } from '../types';
import { currentPageState, firstIndexState, lastIndexState, PAGE_SIZE } from '../recoil/page';
import PaginationContainer from '../components/PaginationContainer';
import { ListWrapper, PostInfo } from '../styles/ts/components/PostList';

interface PostListProps {
  posts: PostItem[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * PAGE_SIZE);
      setLastIndex(page * PAGE_SIZE);
    },
    [PAGE_SIZE]
  );

  return (
    <>
      <ListWrapper>
        <ul>
          {posts?.slice(firstIndex, lastIndex).map((post, idx) => (
            <li key={post.id}>
              <Link href={{ pathname: `/post/${post.id}`, query: { idx } }} as={`/post/${post.id}`}>
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
      <PaginationContainer pageSize={PAGE_SIZE} current={currentPage} total={posts?.length} onChange={onChangePage} />
    </>
  );
};

export default PostList;
