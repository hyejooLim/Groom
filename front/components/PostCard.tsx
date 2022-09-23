import React, { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import dayjs from 'dayjs';

import Title from './Title';
import PaginationContainer from './PaginationContainer';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import useGetUser from '../hooks/query/useGetUser';
import useGetPosts from '../hooks/query/useGetPosts';
import useLikePost from '../hooks/query/useLikePost';
import useUnLikePost from '../hooks/query/useUnLikePost';
import useSubscribePost from '../hooks/query/useSubscribePost';
import useUnSubscribePost from '../hooks/query/useUnSubscribePost';
import useDeletePost from '../hooks/query/useDeletePost';
import { PostItem } from '../types';
import { HeadWrapper, Date, ContentWrapper, PostButton, EditButton } from '../styles/ts/components/PostCard';

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { data: user } = useGetUser();
  const { data: posts } = useGetPosts();

  const likePost = useLikePost();
  const unLikePost = useUnLikePost();
  const subscribePost = useSubscribePost();
  const unSubscribePost = useUnSubscribePost();
  const deletePost = useDeletePost();

  const [currentPost, setCurrentPost] = useState<PostItem>(post);
  const [currentPage, setCurrentPage] = useState(posts?.length + 1 - post.id);

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
      setCurrentPage(page);
      setCurrentPost(posts.find((item) => item.id === posts.length + 1 - page));
    },
    [posts]
  );

  return (
    <>
      <HeadWrapper>
        <Title title={`[${currentPost.category?.name}] ${currentPost.title}`} />
        <Date>{dayjs(currentPost.createdAt).format('YYYY.MM.DD hh:mm')}</Date>
      </HeadWrapper>
      <ContentWrapper>
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
          <PostButton>
            <span>
              {currentPost.likers?.find((liker) => liker.id === user?.id) ? (
                <HeartTwoTone key='heart' twoToneColor='red' onClick={onUnLikePost} />
              ) : (
                <HeartOutlined key='heart' onClick={onLikePost} />
              )}
            </span>
            <span style={{ marginLeft: 7 }}>공감</span>
          </PostButton>
          {currentPost.subscribers?.find((subscriber) => subscriber.id === user?.id) ? (
            <PostButton style={{ marginLeft: 10 }} onClick={onUnSubscribePost}>
              구독취소
            </PostButton>
          ) : (
            <PostButton style={{ marginLeft: 10 }} onClick={onSubscribePost}>
              구독하기
            </PostButton>
          )}
        </div>
        {user?.id === currentPost.authorId && (
          <EditButton>
            <Link href={`/write/${post.id}`}>
              <a>
                <Button className='modify btn'>Modify</Button>
              </a>
            </Link>
            <span className='line'>|</span>
            <Button className='delete btn' onClick={onDeletePost}>
              Delete
            </Button>
          </EditButton>
        )}
      </ContentWrapper>
      <PaginationContainer pageSize={1} current={currentPage} total={posts?.length} onChange={onChangePage} />
      <div>
        {currentPost.allowComments && <CommentForm post={currentPost} />}
        <CommentList postId={currentPost.id} />
      </div>
    </>
  );
};

export default PostCard;
