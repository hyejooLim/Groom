import React, { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import { useRecoilValue } from 'recoil';
import { BsCloudFill } from 'react-icons/bs';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { FiShare } from 'react-icons/fi';
import dayjs from 'dayjs';

import Title from '../common/Title';
import PaginationContainer from '../common/PaginationContainer';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import PostShare from './PostShare';
import { useGetUser } from '../../hooks/query/user';
import { useGetPosts } from '../../hooks/query/posts';
import {
  useDeletePost,
  useLikePost,
  useUnLikePost,
  useSubscribePost,
  useUnSubscribePost,
} from '../../hooks/query/post';
import { useAddNeighbor, useCancelNeighbor } from '../../hooks/query/neighbor';
import { mainPostsState } from '../../recoil/posts';
import { PostItem } from '../../types';
import * as S from '../../styles/ts/components/post/PostCard';

polyfill();

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { status } = useSession();
  const { data: user } = useGetUser();

  const likePost = useLikePost();
  const unLikePost = useUnLikePost();
  const subscribePost = useSubscribePost();
  const unSubscribePost = useUnSubscribePost();
  const deletePost = useDeletePost();
  const addNeighbor = useAddNeighbor();
  const cancelNeighbor = useCancelNeighbor();

  useGetPosts();
  const mainPosts = useRecoilValue(mainPostsState);
  const [currentPost, setCurrentPost] = useState<PostItem>(post);
  const [isShowPopover, setIsShowPopover] = useState(false);

  const findPostIndex = (element: PostItem) => element.id === post.id;
  const [currentPage, setCurrentPage] = useState(mainPosts.findIndex(findPostIndex) + 1);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  useEffect(() => {
    setCurrentPage(mainPosts.findIndex(findPostIndex) + 1);
  }, [mainPosts]);

  useEffect(() => {
    if (deletePost.isSuccess) {
      setTimeout(() => {
        Router.push('/');
      }, 200);
    }
  }, [deletePost]);

  const onToggleLikePost = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    currentPost.likers?.find((liker) => liker.id === user?.id)
      ? unLikePost.mutate(currentPost.id)
      : likePost.mutate(currentPost.id);
  }, [status, user, currentPost]);

  const onSubscribePost = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    subscribePost.mutate(currentPost.id);
  }, [status, currentPost]);

  const onUnSubscribePost = useCallback(() => {
    unSubscribePost.mutate(currentPost.id);
  }, [currentPost]);

  const onAddNeighbor = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    if (!confirm(`${currentPost.author?.name}님을 이웃 추가하시겠습니까?`)) {
      return;
    }

    addNeighbor.mutate(currentPost.authorId);
  }, [status, currentPost]);

  const onCancelNeighbor = useCallback(() => {
    if (!confirm(`${currentPost.author?.name}님을 이웃 취소하시겠습니까?`)) {
      return;
    }

    cancelNeighbor.mutate(currentPost.authorId);
  }, [currentPost]);

  const onDeletePost = useCallback(() => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deletePost.mutate(currentPost.id);
  }, [currentPost]);

  const onChangePage = useCallback(
    (page: number) => {
      const postId = mainPosts.find((item, idx) => idx === page - 1).id;

      setCurrentPage(page);

      Router.push(`/post/${postId}`);
    },
    [mainPosts]
  );

  return (
    <>
      <S.HeadWrapper>
        <Title title={`[${currentPost.category?.name}] ${currentPost.title}`} />
        <S.Author>
          {status === 'authenticated' && user?.id === currentPost.authorId && <BsCloudFill className='icon groom' />}
          {status === 'authenticated' &&
            user?.id !== currentPost.authorId &&
            user?.neighbors.find((neighbor) => neighbor.id === currentPost.authorId) && (
              <RiUserFollowLine className='icon' onClick={onCancelNeighbor} />
            )}
          {status === 'authenticated' &&
            user?.id !== currentPost.authorId &&
            !user?.neighbors.find((neighbor) => neighbor.id === currentPost.authorId) && (
              <RiUserUnfollowLine className='icon' onClick={onAddNeighbor} />
            )}
          {status === 'unauthenticated' && <RiUserUnfollowLine className='icon' onClick={onAddNeighbor} />}
          <span>{currentPost.author?.name}의 글</span>
        </S.Author>
        <S.Date>{dayjs(currentPost.createdAt).format('YYYY.MM.DD HH:mm')}</S.Date>
      </S.HeadWrapper>
      <S.ContentWrapper>
        <div className='tag_label'>
          {currentPost.tags?.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.name}`}>
              <a>#{tag.name}</a>
            </Link>
          ))}
        </div>
        <div className='article'>
          <Markup content={currentPost.htmlContent} />
        </div>
        <div style={{ display: 'flex' }}>
          <S.PostButton className='share' onClick={() => setIsShowPopover(true)}>
            <FiShare />
          </S.PostButton>
          <PostShare postId={currentPost.id} isShow={isShowPopover} onClose={() => setIsShowPopover(false)} />
          <S.PostButton onClick={onToggleLikePost}>
            <span>
              {status === 'authenticated' && currentPost.likers?.find((liker) => liker.id === user?.id) ? (
                <HeartTwoTone key='heart' twoToneColor='red' />
              ) : (
                <HeartOutlined key='heart' />
              )}
            </span>
            <span style={{ marginLeft: 7 }}>공감</span>
          </S.PostButton>
          {status === 'authenticated' && currentPost.subscribers?.find((subscriber) => subscriber.id === user?.id) ? (
            <S.PostButton onClick={onUnSubscribePost}>구독취소</S.PostButton>
          ) : (
            <S.PostButton onClick={onSubscribePost}>구독하기</S.PostButton>
          )}
        </div>
        {status === 'authenticated' && user?.id === currentPost.authorId && (
          <S.EditButton>
            <Link href={{ pathname: `/write/${post.id}`, query: { prevPathname: 'postcard' } }}>
              <a>
                <Button className='modify btn'>Modify</Button>
              </a>
            </Link>
            <span className='line'>|</span>
            <Button className='delete btn' onClick={onDeletePost}>
              Delete
            </Button>
          </S.EditButton>
        )}
      </S.ContentWrapper>
      <PaginationContainer pageSize={1} current={currentPage} total={mainPosts?.length} onChange={onChangePage} />
      <div>
        {currentPost.allowComments && <CommentForm post={currentPost} />}
        <CommentList postId={currentPost.id} />
      </div>
    </>
  );
};

export default PostCard;
