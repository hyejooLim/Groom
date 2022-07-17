import React, { FC, useCallback, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

import Title from './Title';
import { PostItem } from '../types';
import PaginationContainer from './PaginationContainer';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

import { user, mainPosts } from '../pages'; // dummyData

const HeadWrapper = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`;

const Date = styled.div`
  position: absolute;
  bottom: -44px;
  left: -10px;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  background-color: #555;
  cursor: default;

  ::before {
    position: absolute;
    top: 0;
    left: -6px;
    width: 0;
    height: 0;
    content: ' ';
    border-top: 20px solid #555;
    border-left: 6px solid transparent;
  }

  ::after {
    position: absolute;
    bottom: 0;
    left: -6px;
    width: 0;
    height: 0;
    content: ' ';
    border-bottom: 20px solid #555;
    border-left: 6px solid transparent;
  }

  @media (max-width: 959px) {
    bottom: -10px;
    right: 0;
    left: inherit;
    padding: 8px 5px 6px;
    font-size: 11px;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all;
  height: auto;

  .tag_label {
    float: right;

    a {
      margin-right: 8px;
      font-size: 13px;
      color: #777;

      &:hover {
        color: #000;
      }
    }
  }
`;

const PostButton = styled(Button)`
  margin-top: 50px; //
  background-color: transparent;
  width: 80px;
  height: 32px;
  border: 1px solid rgba(185, 185, 185, 0.5);
  border-radius: 16px;
  line-height: 30px;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;

  :hover {
    border-color: rgba(185, 185, 185, 0.5);
    color: inherit;
  }
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;

  .btn {
    width: 70px;
    color: #777;
    background-color: transparent;
    font-size: 14px;
    font-family: 'Courier New';

    :hover {
      color: #e55;
    }
  }

  .line {
    padding: 0 5px;
    font-size: 9px;
    color: #ddd;
  }
`;

interface PostCardProps {
  post: PostItem;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [posts, setPosts] = useState(mainPosts);
  const [liked, setLiked] = useState(null);
  const [currentPost, setCurrentPost] = useState(post);
  const [currentPage, setCurrentPage] = useState(mainPosts.length + 1 - Number(post.id));

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

  const onSubscribeAuthor = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }

    if (user.subscribers.find((subscriber) => subscriber.id === currentPost.authorId)) {
      alert('이미 구독한 유저입니다.');
    }

    // 로그인한 유저의 구독 목록에 해당 게시글의 author의 id를 추가
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
      setCurrentPost(mainPosts.find((item) => item.id === String(mainPosts.length + 1 - page)));
    },
    [mainPosts]
  );

  return (
    <>
      <HeadWrapper>
        <Title title={`[${currentPost.Category.name}] ${currentPost.title}`} />
        <Date>{currentPost.createdAt}</Date>
      </HeadWrapper>
      <ContentWrapper>
        <div className='tag_label'>
          {currentPost.tags?.map((tag, idx) => (
            <Link href={`/tag/${tag}`} key={idx}>
              <a>#{tag}</a>
            </Link>
          ))}
        </div>
        <div className='article'>{currentPost.content}</div>
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
          <PostButton style={{ marginLeft: 10 }} onClick={onSubscribeAuthor}>
            구독하기
          </PostButton>
        </div>
        {user.id === currentPost.authorId && (
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
      <PaginationContainer pageSize={1} current={currentPage} total={posts.length} onChange={onChangePage} />
      <div>
        <CommentForm post={currentPost} />
        {currentPost.Comments && <CommentList comments={currentPost.Comments} />}
      </div>
    </>
  );
};

export default PostCard;
