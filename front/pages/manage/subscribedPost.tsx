import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/PostManageList';
import PaginationContainer from '../../components/PaginationContainer';
import { CloseButton } from '../../styles/ts/common';
import useGetUser from '../../hooks/query/useGetUser';
import { PostItem } from '../../types';

const pageSize = 5;

const ManageSubscribedPost = () => {
  const { data: user } = useGetUser();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [posts, setPosts] = useState<PostItem[]>(null);
  const [postsCount, setPostsCount] = useState(null);
  const [title, setTitle] = useState('');

  const onLoadMainPosts = useCallback(() => {
    setTitle('');
    setPosts(null);
    setPostsCount(null);

    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(pageSize);
  }, [user, pageSize]);

  const onChangePostList = useCallback(
    (e: any) => {
      setTitle(e.target.dataset.name);
      setCurrentPage(1);
      setFirstIndex(0);
      setLastIndex(pageSize);

      const newPosts = user?.subscribedPosts.filter((post) => post.category.id === e.target.dataset.id);
      setPosts(newPosts);
      setPostsCount(newPosts?.length);
    },
    [pageSize, posts]
  );

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독 글 관리</title>
      </Head>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {title ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CloseButton onClick={onLoadMainPosts}>
              <CloseCircleOutlined />
            </CloseButton>
            <span style={{ fontSize: '18px', marginLeft: '8px' }}>{title} 글</span>
          </div>
        ) : (
          <span style={{ fontSize: '18px' }}>구독 글 관리</span>
        )}
        <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>
          {postsCount ?? user?.subscribedPosts.length}
        </span>
      </div>
      <PostManageList
        posts={posts ?? user?.subscribedPosts}
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        onChangePostList={onChangePostList}
      />
      <PaginationContainer
        pageSize={pageSize}
        current={currentPage}
        total={postsCount ?? user?.subscribedPosts.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManageSubscribedPost;
