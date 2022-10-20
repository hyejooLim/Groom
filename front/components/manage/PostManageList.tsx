import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import dayjs from 'dayjs';

import { useGetUser } from '../../hooks/query/user';
import { useDeletePost, useUnSubscribePost, useToggleIsPublicPost } from '../../hooks/query/post';
import { PostItem } from '../../types';
import * as S from '../../styles/ts/components/manage/PostManageList';

interface PostManageListProps {
  posts: PostItem[];
  firstIndex: number;
  lastIndex: number;
}

const PostManageList: FC<PostManageListProps> = ({ posts, firstIndex, lastIndex }) => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const deletePost = useDeletePost();
  const toggleIsPublicPost = useToggleIsPublicPost();
  const unSubscribePost = useUnSubscribePost();

  const onDeletePost = useCallback((id: number) => {
    const confirm = window.confirm('선택한 글을 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }

    deletePost.mutate(id);
  }, []);

  const onToggleIsPublicPost = (id: number, isPublic: boolean) => {
    toggleIsPublicPost.mutate({ id, isPublic: !isPublic });
  };

  const onUnSubscribe = useCallback((id: number) => {
    const confirm = window.confirm('구독을 취소하시겠습니까?');
    if (!confirm) {
      return;
    }

    unSubscribePost.mutate(id);
  }, []);

  return (
    <S.ListWrapper>
      {posts?.length > 0 ? (
        posts?.slice(firstIndex, lastIndex).map((post) => (
          <S.PostInfo key={post.id}>
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
                <Link
                  href={{ pathname: `/manage/posts/category/${post.categoryId}`, query: { name: post.category?.name } }}
                  as={`/manage/posts/category/${post.categoryId}`}
                >
                  <a>
                    <span>{post.category?.name}</span>
                  </a>
                </Link>
                <span>{post.author?.name}</span>
                <span>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}</span>
              </div>
            </div>
            {!post.isPublic && <AiOutlineEyeInvisible className='invisible_icon' />}
            <S.PostButton>
              {user?.id === post?.authorId && (
                <>
                  <Link href={`/write/${post.id}`}>
                    <a>
                      <Button className='modify btn'>수정</Button>
                    </a>
                  </Link>
                  <Button className='delete btn' onClick={() => onDeletePost(post.id)}>
                    삭제
                  </Button>
                  <Button className='public btn' onClick={() => onToggleIsPublicPost(post.id, post.isPublic)}>
                    {post.isPublic ? '공개' : '비공개'}
                  </Button>
                </>
              )}
              {router.pathname === '/manage/subscribedPosts' && (
                <Button className='subscribe_cancel btn' onClick={() => onUnSubscribe(post.id)}>
                  구독 취소
                </Button>
              )}
            </S.PostButton>
          </S.PostInfo>
        ))
      ) : (
        <S.EmptySearchBox>
          <div className='icon_wrapper'>
            <FiSearch className='icon' />
          </div>
          결과가 없습니다.
        </S.EmptySearchBox>
      )}
    </S.ListWrapper>
  );
};

export default PostManageList;
