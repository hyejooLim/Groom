import React, { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import { useRecoilValue } from 'recoil';
import { BsCloudFill } from 'react-icons/bs';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FiShare } from 'react-icons/fi';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import Title from '../common/Title';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import PostShare from './PostShare';
import { useGetUser } from '../../hooks/query/user';
import { useGetPosts } from '../../hooks/query/posts';
import { useLikePost, useUnLikePost, useSubscribePost, useUnSubscribePost } from '../../hooks/query/post';
import { useAddNeighbor, useCancelNeighbor } from '../../hooks/query/neighbor';
import { mainPostsState } from '../../recoil/posts';
import { PostItem } from '../../types';

polyfill();

interface PostCardProps {
  post: PostItem;
  onDeletePost: (id: number) => void;
}

const PostCard: FC<PostCardProps> = ({ post, onDeletePost }) => {
  const { status } = useSession();
  const { data: user } = useGetUser();

  const likePost = useLikePost();
  const unLikePost = useUnLikePost();
  const subscribePost = useSubscribePost();
  const unSubscribePost = useUnSubscribePost();
  const addNeighbor = useAddNeighbor();
  const cancelNeighbor = useCancelNeighbor();

  useGetPosts();
  const mainPosts = useRecoilValue(mainPostsState);
  const [isShowPopover, setIsShowPopover] = useState(false);

  const findPostIndex = (element: PostItem) => element.id === post?.id;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (post && mainPosts.length) {
      setCurrentIdx(mainPosts.findIndex(findPostIndex));
    }
  }, [post, mainPosts]);

  const onToggleLikePost = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    post?.likers.find((liker) => liker.id === user?.id) ? unLikePost.mutate(post?.id) : likePost.mutate(post?.id);
  }, [status, post]);

  const onSubscribePost = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    subscribePost.mutate(post?.id);
  }, [status, post]);

  const onUnSubscribePost = useCallback(() => {
    unSubscribePost.mutate(post?.id);
  }, [post]);

  const onAddNeighbor = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    if (!confirm(`${post?.author.name}님을 이웃 추가하시겠습니까?`)) {
      return;
    }

    addNeighbor.mutate(post?.authorId);
  }, [status, post]);

  const onCancelNeighbor = useCallback(() => {
    if (!confirm(`${post?.author.name}님을 이웃 취소하시겠습니까?`)) {
      return;
    }

    cancelNeighbor.mutate(post?.authorId);
  }, [post]);

  const deletePost = useCallback(() => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) return;

    onDeletePost(post?.id);
  }, [post]);

  const onClickPrevPost = useCallback(() => {
    const prevPostId = mainPosts[mainPosts.findIndex(findPostIndex) - 1].id;
    Router.push(`/post/${prevPostId}`);
  }, [mainPosts, post]);

  const onClickNextPost = useCallback(() => {
    const nextPostId = mainPosts[mainPosts.findIndex(findPostIndex) + 1].id;
    Router.push(`/post/${nextPostId}`);
  }, [mainPosts, post]);

  const formatDate = (createdAt: string) => {
    const now = dayjs();
    const date = dayjs(createdAt);

    const diffInSeconds = now.diff(date, 'second');
    const diffInMinutes = now.diff(date, 'minute');
    const diffInHours = now.diff(date, 'hour');
    const diffInDays = now.diff(date, 'day');

    // 1. 24시간 이내
    if (diffInHours < 24) {
      if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
      if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
      return `${diffInHours}시간 전`;
    }

    // 2. 24시간 이후 ~ 30일 이전
    if (diffInDays < 30) {
      return `${diffInDays}일 전`;
    }

    // 3. 한 달 이후
    return date.format('YYYY년 M월 D일');
  };

  return (
    <>
      <div className='w-full text-center'>
        {post?.id ? <Title title={`[${post?.category.name}] ${post?.title}`} /> : <Title title='[Category] Title' />}
        <div className='flex justify-between items-center'>
          <div className='text-black/60 text-sm'>{formatDate(post?.createdAt)}</div>
          <div className='flex items-center gap-x-2'>
            {status === 'loading' && <BsCloudFill className='text-2xl' color='#fff' />}
            {status === 'authenticated' && user?.id === post?.authorId && (
              <BsCloudFill className='text-2xl' color='#fff' />
            )}
            {status === 'authenticated' &&
              user?.id !== post?.authorId &&
              user?.neighbors.find((neighbor) => neighbor.id === post?.authorId) && (
                <RiUserFollowLine className='text-2xl' onClick={onCancelNeighbor} />
              )}
            {status === 'authenticated' &&
              user?.id !== post?.authorId &&
              !user?.neighbors.find((neighbor) => neighbor.id === post?.authorId) && (
                <RiUserUnfollowLine className='text-2xl' onClick={onAddNeighbor} />
              )}
            {status === 'unauthenticated' && <RiUserUnfollowLine className='text-2xl' onClick={onAddNeighbor} />}
            <span>{post?.author.name}의 글</span>
          </div>
        </div>
      </div>
      <div className='p-4 bg-white border border-light-grey mt-4'>
        {post?.tags?.length ? (
          <div className='min-h-8 text-right pb-2 pl-16'>
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/tag/${tag.name}`}>
                #{tag.name}
              </Link>
            ))}
          </div>
        ) : null}
        <Markup content={post?.htmlContent} />
        <div className='flex gap-x-3 mt-14'>
          <button
            className='border border-solid border-light-grey px-4 py-2 rounded-2xl'
            onClick={() => setIsShowPopover(true)}
          >
            <FiShare />
          </button>
          <PostShare postId={post?.id} isShow={isShowPopover} onClose={() => setIsShowPopover(false)} />
          <button className='border border-solid border-light-grey px-4 py-2 rounded-2xl' onClick={onToggleLikePost}>
            <span>
              {status === 'authenticated' && post?.likers.find((liker) => liker.id === user?.id) ? (
                <HeartTwoTone key='heart' twoToneColor='red' {...({} as React.ComponentProps<typeof HeartTwoTone>)} />
              ) : (
                <HeartOutlined key='heart' {...({} as React.ComponentProps<typeof HeartOutlined>)} />
              )}
            </span>
            <span className='ml-2'>공감</span>
          </button>
          {status === 'authenticated' && post?.subscribers.find((subscriber) => subscriber.id === user?.id) ? (
            <button className='border border-solid border-light-grey px-4 py-2 rounded-2xl' onClick={onUnSubscribePost}>
              구독취소
            </button>
          ) : (
            <button className='border border-solid border-light-grey px-4 py-2 rounded-2xl' onClick={onSubscribePost}>
              구독하기
            </button>
          )}
        </div>
        {status === 'authenticated' && user?.id === post?.authorId && (
          <div className='flex items-center justify-center mt-20 mb-10 text-lg'>
            <Link
              href={{
                pathname: `/write/${post?.id}`,
                query: { prevPathname: 'postcard' },
              }}
            >
              <button className='text-dark-grey hover:text-blue transition-colors duration-200'>Modify</button>
            </Link>
            <span className='text-light-grey px-4'>|</span>
            <button className='text-dark-grey hover:text-error transition-colors duration-200' onClick={deletePost}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className='flex justify-center gap-x-20 mt-8'>
        <Button
          className='!rounded-full enabled:!text-dark enabled:!border-dark enabled:hover:!text-white enabled:hover:!bg-primary enabled:hover:!border-primary'
          size='large'
          variant='outlined'
          disabled={currentIdx === 0}
          onClick={onClickPrevPost}
        >
          <GrFormPrevious className='mr-5' />
          <span>이전 게시글</span>
        </Button>
        <Button
          className='!rounded-full enabled:!text-dark enabled:!border-dark enabled:hover:!text-white enabled:hover:!bg-primary enabled:hover:!border-primary'
          size='large'
          variant='outlined'
          disabled={mainPosts.length ? currentIdx === mainPosts.length - 1 : false}
          onClick={onClickNextPost}
        >
          <span>다음 게시글</span>
          <GrFormNext className='ml-5' />
        </Button>
      </div>
      <div>
        {post?.allowComments && <CommentForm post={post} />}
        {post && <CommentList postId={post?.id} />}
      </div>
    </>
  );
};

export default PostCard;
