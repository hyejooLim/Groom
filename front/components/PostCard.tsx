import React, { FC, useCallback, useState } from 'react';
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
import { PostItem } from '../types';
import useGetUser from '../hooks/query/useGetUser';
import { HeadWrapper, Date, ContentWrapper, PostButton, EditButton } from '../styles/ts/components/PostCard';
import useGetPosts from '../hooks/query/useGetPosts';

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { data: user } = useGetUser();
  const { data: posts } = useGetPosts();

  const [liked, setLiked] = useState(null);
  const [currentPost, setCurrentPost] = useState(post);
  const [currentPage, setCurrentPage] = useState(posts?.length + 1 - post.id);

  const onLike = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }

    // LIKE_POST_REQUEST
  }, [user]);

  const onUnLike = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.');

      // UNLIKE_POST_REQUEST
    }
  }, [user]);

  const onSubscribePost = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }

    if (user.subscribedPosts.find((post) => post.id === currentPost.id)) {
      alert('이미 구독한 글입니다.');
    }

    // 로그인한 유저의 구독 목록에 해당 게시글의 id를 추가
  }, [user, currentPost]);

  const onClickModifyBtn = useCallback(() => {
    Router.push({
      pathname: '/write',
      query: {
        post: JSON.stringify(post),
      },
    });
  }, []);

  const onDeletePost = useCallback(() => {
    const confirm = window.confirm('정말 게시글을 삭제하시겠습니까?');
    if (confirm) {
      // 게시글 삭제

      alert('게시글이 삭제되었습니다.');
    } else {
      return;
    }
  }, []);

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
            <Link key={tag.id} href={`/tag/${tag}`}>
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
              {liked ? (
                <HeartTwoTone key='heart' twoToneColor='red' onClick={onUnLike} />
              ) : (
                <HeartOutlined key='heart' onClick={onLike} />
              )}
            </span>
            <span style={{ marginLeft: 7 }}>공감</span>
          </PostButton>
          <PostButton style={{ marginLeft: 10 }} onClick={onSubscribePost}>
            구독하기
          </PostButton>
        </div>
        {user?.id === currentPost.authorId && (
          <EditButton>
            <Link href={{ pathname: '/write', query: { post: JSON.stringify(post) } }} as={`/write/${post.id}`}>
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
        <CommentForm post={currentPost} />
        {currentPost.comments && <CommentList comments={currentPost.comments} />}
      </div>
    </>
  );
};

export default PostCard;
