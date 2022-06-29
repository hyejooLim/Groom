import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

import { PostType } from '../types';
import Title from './Title';
import PaginationContainer from './PaginationContainer';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { posts } from '../pages'; // dummyData

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
`;

const ContentWrapper = styled.div`
  padding: 20px 15px 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 180%;
  word-break: break-all;
  height: auto;
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

const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;

  & .btn {
    border: 0;
    outline: none;
    background-color: transparent;
    font-size: 16px;

    :hover {
      color: #000;
    }
  }
`;

interface PostCardProps {
  post: PostType;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const [user, setUser] = useState({
    id: '77',
    name: '홍길동',
    email: 'hong@naver.com',
    posts: 10,
    subscribers: ['22', '33', '44'], // 나를 구독하고 있는 유저 수
  });
  const [liked, setLiked] = useState(null);
  const [currentPage, setCurrentPage] = useState(posts.length + 1 - Number(post.id));

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

  const onSubscribe = useCallback(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
    }

    if (user.subscribers.find((id) => id === post.authorId)) {
      alert('이미 구독한 유저입니다.');
    }

    // 로그인한 유저의 구독 목록에 해당 게시글의 author의 id를 추가
  }, [user, post]);

  const onModifyPost = useCallback(() => {
    // 게시글 수정 모드로 변환
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

  return (
    <>
      <HeadWrapper>
        <Title title={`[${post.category}] ${post.title}`} />
        <Date>{post.createdAt}</Date>
      </HeadWrapper>

      {/* content */}
      <ContentWrapper>
        <div className='tag_label'></div>
        <div className='article'>{post.content}</div>
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
          <PostButton style={{ marginLeft: 10 }} onClick={onSubscribe}>
            구독하기
          </PostButton>
        </div>
        {user.id === post.authorId && (
          <EditWrapper>
            <Button className='modify btn' onClick={onModifyPost}>
              Modify
            </Button>
            |
            <Button className='delete btn' onClick={onDeletePost}>
              Delete
            </Button>
          </EditWrapper>
        )}
      </ContentWrapper>
      <PaginationContainer
        posts={posts}
        pageSize={1}
        current={currentPage}
        total={posts.length}
        onChange={(page: number) => setCurrentPage(page)}
      />
      <div>
        <CommentForm post={post} />
        <CommentList comments={posts[0].Comments} />
      </div>
    </>
  );
};

export default PostCard;
