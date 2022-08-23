import React, { FC, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { PostButton, ListWrapper, PostInfo } from '../styles/ts/components/PostManageList';
import useGetUser from '../hooks/query/useGetUser';
import deletePost from '../apis/deletePost';
import { PostItem } from '../types';

interface PostManageListProps {
  posts: PostItem[];
  firstIndex: number;
  lastIndex: number;
  onChangePostList: (e: any) => void;
}

const PostManageList: FC<PostManageListProps> = ({ posts, firstIndex, lastIndex, onChangePostList }) => {
  const { data: user, refetch } = useGetUser();

  const onDeletePost = useCallback(async (id: number) => {
    try {
      const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
      if (!confirm) {
        return;
      }

      const result = await deletePost(id);

      if (result.ok) {
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onCancelSubscribe = () => {
    const confirm = window.confirm('구독을 취소하시겠습니까?');
    if (!confirm) {
      return;
    }

    // 구독 취소 액션
    // user.subscribedPost에서 제거
  };

  return (
    <ListWrapper>
      {posts?.slice(firstIndex, lastIndex).map((post) => (
        <PostInfo key={post.id}>
          <div>
            <div className='post_title'>
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a>
                  <span>
                    [{post?.category?.name}] {post.title}
                  </span>
                </a>
              </Link>
              <PaperClipOutlined />
            </div>
            <div className='post_extra_info'>
              <a onClick={onChangePostList}>
                <span data-name={post?.category?.name} data-id={post.category?.id}>
                  {post.category?.name}
                </span>
              </a>
              <span>{post.author?.name}</span>
              <span>{dayjs(post.createdAt).format('YYYY.MM.DD hh:mm')}</span>
            </div>
          </div>
          <PostButton>
            {user?.id === post?.authorId ? (
              <>
                <Link href={{ pathname: '/write', query: { post: JSON.stringify(post) } }} as={`/write/${post.id}`}>
                  <a>
                    <Button className='modify btn'>수정</Button>
                  </a>
                </Link>
                <Button className='delete btn' onClick={() => onDeletePost(post.id)}>
                  삭제
                </Button>
              </>
            ) : (
              <Button className='subscribe_cancel btn' onClick={onCancelSubscribe}>
                구독 취소
              </Button>
            )}
          </PostButton>
        </PostInfo>
      ))}
    </ListWrapper>
  );
};

export default PostManageList;
