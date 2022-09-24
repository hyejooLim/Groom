import React, { FC, useCallback } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { FiSearch } from 'react-icons/fi';
import dayjs from 'dayjs';

import useGetUser from '../hooks/query/useGetUser';
import useDeletePost from '../hooks/query/useDeletePost';
import { PostItem } from '../types';
import useUnSubscribePost from '../hooks/query/useUnSubscribePost';
import { PostButton, ListWrapper, PostInfo, EmptySearchBox } from '../styles/ts/components/PostManageList';

interface PostManageListProps {
  posts: PostItem[];
  firstIndex: number;
  lastIndex: number;
  onChangePostList: (e: any) => void;
}

const PostManageList: FC<PostManageListProps> = ({ posts, firstIndex, lastIndex, onChangePostList }) => {
  const { data: user } = useGetUser();
  const unSubscribePost = useUnSubscribePost();
  const deletePost = useDeletePost();

  const onDeletePost = useCallback((id: number) => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deletePost.mutate(id);
  }, []);

  const onUnSubscribe = useCallback((id: number) => {
    const confirm = window.confirm('구독을 취소하시겠습니까?');
    if (!confirm) {
      return;
    }

    unSubscribePost.mutate(id);
  }, []);

  return (
    <ListWrapper>
      {posts?.length > 0 ? (
        posts?.slice(firstIndex, lastIndex).map((post) => (
          <PostInfo key={post.id}>
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
                <a onClick={onChangePostList}>
                  <span data-name={post?.category?.name} data-id={post?.categoryId}>
                    {post.category?.name}
                  </span>
                </a>
                <span>{post.author?.name}</span>
                <span>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}</span>
              </div>
            </div>
            <PostButton>
              {user?.id === post?.authorId ? (
                <>
                  <Link href={`/write/${post.id}`}>
                    <a>
                      <Button className='modify btn'>수정</Button>
                    </a>
                  </Link>
                  <Button className='delete btn' onClick={() => onDeletePost(post.id)}>
                    삭제
                  </Button>
                </>
              ) : (
                <Button className='subscribe_cancel btn' onClick={() => onUnSubscribe(post.id)}>
                  구독 취소
                </Button>
              )}
            </PostButton>
          </PostInfo>
        ))
      ) : (
        <EmptySearchBox>
          <div className='icon_wrapper'>
            <FiSearch className='icon' />
          </div>
          결과가 없습니다.
        </EmptySearchBox>
      )}
    </ListWrapper>
  );
};

export default PostManageList;
