import React, { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import { polyfill } from 'interweave-ssr';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';

import Title from '../common/Title';
import PaginationContainer from '../common/PaginationContainer';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';
import { useGetUser } from '../../hooks/query/user';
import {
  useDeletePost,
  useLikePost,
  useUnLikePost,
  useSubscribePost,
  useUnSubscribePost,
} from '../../hooks/query/post';
import { mainPostsState } from '../../recoil/posts';
import { PostItem } from '../../types';
import * as S from '../../styles/ts/components/post/PostCard';

polyfill();

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { data: user } = useGetUser();

  const likePost = useLikePost();
  const unLikePost = useUnLikePost();
  const subscribePost = useSubscribePost();
  const unSubscribePost = useUnSubscribePost();
  const deletePost = useDeletePost();

  const mainPosts = useRecoilValue(mainPostsState);
  const [currentPost, setCurrentPost] = useState<PostItem>(post);

  const findPostIndex = (element: PostItem) => element.id === post.id;
  const [currentPage, setCurrentPage] = useState(mainPosts.findIndex(findPostIndex) + 1);

  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  useEffect(() => {
    if (deletePost.isSuccess) {
      setTimeout(() => {
        Router.push('/');
      }, 200);
    }
  }, [deletePost]);

  const onLikePost = useCallback(() => {
    if (!user) {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    likePost.mutate(currentPost.id);
  }, [user, currentPost]);

  const onUnLikePost = useCallback(() => {
    unLikePost.mutate(currentPost.id);
  }, [currentPost]);

  const onSubscribePost = useCallback(() => {
    if (!user) {
      if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        Router.push('/login');
      }

      return;
    }

    subscribePost.mutate(currentPost.id);
  }, [user, currentPost]);

  const onUnSubscribePost = useCallback(() => {
    unSubscribePost.mutate(currentPost.id);
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
        <S.Date>{dayjs(currentPost.createdAt).format('YYYY.MM.DD HH:mm')}</S.Date>
      </S.HeadWrapper>
      <S.ContentWrapper>
        <div className='tag_label'>
          {currentPost.tags?.map((tag) => (
            <Link key={tag.id} href={{ pathname: '/tag/[name]', query: { id: tag.id, name: tag.name } }}>
              <a>#{tag.name}</a>
            </Link>
          ))}
        </div>
        <div className='article'>
          <Markup content={currentPost.htmlContent} />
        </div>
        <div style={{ display: 'flex' }}>
          <S.PostButton>
            <span>
              {currentPost.likers?.find((liker) => liker.id === user?.id) ? (
                <HeartTwoTone key='heart' twoToneColor='red' onClick={onUnLikePost} />
              ) : (
                <HeartOutlined key='heart' onClick={onLikePost} />
              )}
            </span>
            <span style={{ marginLeft: 7 }}>공감</span>
          </S.PostButton>
          {currentPost.subscribers?.find((subscriber) => subscriber.id === user?.id) ? (
            <S.PostButton style={{ marginLeft: 10 }} onClick={onUnSubscribePost}>
              구독취소
            </S.PostButton>
          ) : (
            <S.PostButton style={{ marginLeft: 10 }} onClick={onSubscribePost}>
              구독하기
            </S.PostButton>
          )}
        </div>
        {user?.id === currentPost.authorId && (
          <S.EditButton>
            <Link href={`/write/${post.id}`}>
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
