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
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FiShare } from 'react-icons/fi';
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
import * as S from '../../styles/ts/components/post/PostCard';

polyfill();

interface PostCardProps {
  post: PostItem;
  onDeletePost: (id: number) => void;
}

const PostCard: FC<PostCardProps> = ({ post, onDeletePost }) => {
  const { data: session, status } = useSession();
  const { data: user } = useGetUser(session?.user.email);

  const likePost = useLikePost();
  const unLikePost = useUnLikePost();
  const subscribePost = useSubscribePost();
  const unSubscribePost = useUnSubscribePost();
  const addNeighbor = useAddNeighbor();
  const cancelNeighbor = useCancelNeighbor();

  useGetPosts();
  const mainPosts = useRecoilValue(mainPostsState);
  const [isShowPopover, setIsShowPopover] = useState(false);

  const findPostIndex = (element: PostItem) => element.id === post.id;
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    mainPosts.length && setCurrentIdx(mainPosts.findIndex(findPostIndex));
  }, [post, mainPosts]);

  const onToggleLikePost = useCallback(() => {
    if (status === 'unauthenticated') {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    post?.likers.find((liker) => liker.id === user?.id) ? unLikePost.mutate(post?.id) : likePost.mutate(post?.id);
  }, [status, user, post]);

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
    const prevPostId = mainPosts && mainPosts[mainPosts.findIndex(findPostIndex) - 1].id;
    Router.push(`/post/${prevPostId}`);
  }, [mainPosts, post]);

  const onClickNextPost = useCallback(() => {
    const nextPostId = mainPosts && mainPosts[mainPosts.findIndex(findPostIndex) + 1].id;
    Router.push(`/post/${nextPostId}`);
  }, [mainPosts, post]);

  return (
    <>
      <S.HeadWrapper>
        <Title title={`[${post?.category.name}] ${post?.title}`} />
        <S.Author>
          {status === 'authenticated' && user?.id === post?.authorId && <BsCloudFill className='icon groom' />}
          {status === 'authenticated' &&
            user?.id !== post?.authorId &&
            user?.neighbors.find((neighbor) => neighbor.id === post?.authorId) && (
              <RiUserFollowLine className='icon' onClick={onCancelNeighbor} />
            )}
          {status === 'authenticated' &&
            user?.id !== post?.authorId &&
            !user?.neighbors.find((neighbor) => neighbor.id === post?.authorId) && (
              <RiUserUnfollowLine className='icon' onClick={onAddNeighbor} />
            )}
          {status === 'unauthenticated' && <RiUserUnfollowLine className='icon' onClick={onAddNeighbor} />}
          <span>{post?.author.name}의 글</span>
        </S.Author>
        <S.Date>{dayjs(post?.createdAt).format('YYYY.MM.DD HH:mm')}</S.Date>
      </S.HeadWrapper>
      <S.ContentWrapper>
        <div className='tag_label'>
          {post?.tags.map((tag) => (
            <Link key={tag.id} href={`/tag/${tag.name}`}>
              <a>#{tag.name}</a>
            </Link>
          ))}
        </div>
        <div className='article'>
          <Markup content={post?.htmlContent} />
        </div>
        <div style={{ display: 'flex' }}>
          <S.PostButton className='share' onClick={() => setIsShowPopover(true)}>
            <FiShare />
          </S.PostButton>
          <PostShare postId={post?.id} isShow={isShowPopover} onClose={() => setIsShowPopover(false)} />
          <S.PostButton onClick={onToggleLikePost}>
            <span>
              {status === 'authenticated' && post?.likers.find((liker) => liker.id === user?.id) ? (
                <HeartTwoTone key='heart' twoToneColor='red' />
              ) : (
                <HeartOutlined key='heart' />
              )}
            </span>
            <span style={{ marginLeft: 7 }}>공감</span>
          </S.PostButton>
          {status === 'authenticated' && post?.subscribers.find((subscriber) => subscriber.id === user?.id) ? (
            <S.PostButton onClick={onUnSubscribePost}>구독취소</S.PostButton>
          ) : (
            <S.PostButton onClick={onSubscribePost}>구독하기</S.PostButton>
          )}
        </div>
        {status === 'authenticated' && user?.id === post?.authorId && (
          <S.EditButton>
            <Link href={{ pathname: `/write/${post.id}`, query: { prevPathname: 'postcard' } }}>
              <a>
                <Button className='modify btn'>Modify</Button>
              </a>
            </Link>
            <span className='line'>|</span>
            <Button className='delete btn' onClick={deletePost}>
              Delete
            </Button>
          </S.EditButton>
        )}
      </S.ContentWrapper>
      <S.ButtonWrapper>
        <div>
          <Button className='prev button' onClick={onClickPrevPost} disabled={currentIdx === 0}>
            <GrFormPrevious className='prev icon' />
            <span>이전 게시글</span>
          </Button>
          <Button
            className='next button'
            onClick={onClickNextPost}
            disabled={mainPosts.length ? currentIdx === mainPosts.length - 1 : false}
          >
            <span>다음 게시글</span>
            <GrFormNext className='next icon' />
          </Button>
        </div>
      </S.ButtonWrapper>
      <div>
        {post?.allowComments && <CommentForm post={post} />}
        {post && <CommentList postId={post?.id} />}
      </div>
    </>
  );
};

export default PostCard;
