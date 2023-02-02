import React, { FC, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';

import { currentPageState, firstIndexState, lastIndexState, MANAGE_PAGE_SIZE } from '../../recoil/manage';
import { useSsrAllowedState } from '../../recoil/persist';
import PaginationContainer from '../common/PaginationContainer';
import { useGetUser } from '../../hooks/query/user';
import { useDeletePost, useUnSubscribePost, useToggleIsPublicPost } from '../../hooks/query/post';
import { PostItem } from '../../types';
import * as S from '../../styles/ts/components/manage/PostManageList';

interface PostManageListProps {
  posts: PostItem[];
  isLoading: boolean;
  isFetching: boolean;
  onClickCategory: (id: number) => void;
}

const PostManageList: FC<PostManageListProps> = ({ posts, isLoading, isFetching, onClickCategory }) => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const deletePost = useDeletePost();
  const toggleIsPublicPost = useToggleIsPublicPost();
  const unSubscribePost = useUnSubscribePost();

  const [firstIndex, setFirstIndex] = useRecoilState(firstIndexState);
  const [lastIndex, setLastIndex] = useRecoilState(lastIndexState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const setSsrAllowed = useSsrAllowedState();
  useEffect(setSsrAllowed, [setSsrAllowed]);

  const onInitPage = () => {
    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(MANAGE_PAGE_SIZE);
  };

  useEffect(() => {
    onInitPage();
  }, [router.query]);

  const onDeletePost = useCallback((id: number) => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deletePost.mutate(id);
  }, []);

  const onToggleIsPublicPost = (id: number, isPublic: boolean) => {
    toggleIsPublicPost.mutate({ id, isPublic: !isPublic });
  };

  const onUnSubscribe = useCallback((id: number) => {
    const confirm = window.confirm('구독을 취소하시겠습니까?');
    if (!confirm) {
      return;
    }

    unSubscribePost.mutate(id);
  }, []);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * MANAGE_PAGE_SIZE);
      setLastIndex(page * MANAGE_PAGE_SIZE);
    },
    [MANAGE_PAGE_SIZE]
  );

  return (
    <>
      <S.ListWrapper>
        {isLoading || isFetching ? (
          <BeatLoader className='loader' color='#ddd' size={16} />
        ) : (
          <>
            {posts?.length > 0 ? (
              posts?.slice(firstIndex, lastIndex).map((post) => (
                <S.PostInfo key={post.id}>
                  <div>
                    <div className='post_title'>
                      <Link href={`/post/${post.id}`}>
                        <a>
                          <span>{post.title}</span>
                        </a>
                      </Link>
                      <PaperClipOutlined />
                    </div>
                    <div className='post_extra_info'>
                      <a onClick={() => onClickCategory(post.categoryId)}>
                        <span>{post.category?.name}</span>
                      </a>
                      <span>{post.author?.name}</span>
                      <span>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}</span>
                    </div>
                  </div>
                  {!post.isPublic && <AiOutlineEyeInvisible className='invisible_icon' />}
                  <S.PostButton>
                    {user?.id === post?.authorId && (
                      <>
                        <Link href={`/write/${post.id}`}>
                          <a>
                            <Button className='modify btn'>수정</Button>
                          </a>
                        </Link>
                        <Button className='delete btn' onClick={() => onDeletePost(post.id)}>
                          삭제
                        </Button>
                        <Button className='public btn' onClick={() => onToggleIsPublicPost(post.id, post.isPublic)}>
                          {post.isPublic ? '공개' : '비공개'}
                        </Button>
                      </>
                    )}
                    {router.pathname.includes('/manage/subscribedPosts') && (
                      <Button className='subscribe_cancel btn' onClick={() => onUnSubscribe(post.id)}>
                        구독 취소
                      </Button>
                    )}
                  </S.PostButton>
                </S.PostInfo>
              ))
            ) : (
              <S.EmptySearchBox>
                <div className='icon_wrapper'>
                  <FiSearch className='icon' />
                </div>
                결과가 없습니다.
              </S.EmptySearchBox>
            )}
          </>
        )}
      </S.ListWrapper>
      <PaginationContainer
        pageSize={MANAGE_PAGE_SIZE}
        current={currentPage}
        total={posts?.length}
        onChange={onChangePage}
      />
    </>
  );
};

export default PostManageList;
