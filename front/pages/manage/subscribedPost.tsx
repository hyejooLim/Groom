import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import PostManageList from '../../components/PostManageList';
import PaginationContainer from '../../components/PaginationContainer';
import { PostItem } from '../../types';
import { CloseButton } from './post';
import { user } from '..';

const pageSize = 5;

const ManageSubscribedPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [posts, setPosts] = useState<PostItem[]>(user.subscribedPosts);
  const [title, setTitle] = useState('');
  const [postsCount, setPostsCount] = useState(user.subscribedPosts.length);

  const onLoadMainPosts = useCallback(() => {
    setTitle('');
    setPosts(user.subscribedPosts);
    setPostsCount(user.subscribedPosts.length);

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

      let newPosts = [...posts];
      newPosts = newPosts.filter((post) => post.Category.name === e.target.dataset.name);
      setPosts(newPosts);
      setPostsCount(newPosts.length);
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
        <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>{postsCount}</span>
      </div>
      <PostManageList posts={posts} firstIndex={firstIndex} lastIndex={lastIndex} onChangePostList={onChangePostList} />
      <PaginationContainer pageSize={pageSize} current={currentPage} total={posts.length} onChange={onChangePage} />
    </ManageLayout>
  );
};

export default ManageSubscribedPost;
