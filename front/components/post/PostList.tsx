import React, { FC, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import dayjs from 'dayjs';
import BeatLoader from 'react-spinners/BeatLoader';

import { PostItem } from '../../types';
import { useSsrAllowedState } from '../../recoil/persist';
import { currentPageState, firstIndexState, lastIndexState, PAGE_SIZE } from '../../recoil/page';
import PaginationContainer from '../common/PaginationContainer';
import { ListWrapper, PostInfo } from '../../styles/ts/components/post/PostList';

interface PostListProps {
  posts: PostItem[];
  isLoading: boolean;
}

const PostList: FC<PostListProps> = ({ posts, isLoading }) => {
  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const setSsrAllowed = useSsrAllowedState();
  useEffect(setSsrAllowed, [setSsrAllowed]);

  const onChangePage = useCallback(
    (page: number) => {
      setFirstIndex((page - 1) * PAGE_SIZE);
      setLastIndex(page * PAGE_SIZE);
      setCurrentPage(page);
    },
    [PAGE_SIZE]
  );

  return (
    <>
      <ListWrapper>
        {isLoading ? (
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
