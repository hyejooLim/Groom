import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import SearchInput from '../../components/SearchInput';
import PaginationContainer from '../../components/PaginationContainer';
import PostManageList from '../../components/PostManageList';
import { CloseButton } from '../../styles/ts/common';
import useGetUser from '../../hooks/query/useGetUser';
import { PostItem } from '../../types';

const pageSize = 5;

const ManagePost = () => {
  const { data: user } = useGetUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [posts, setPosts] = useState<PostItem[]>(null);
  const [title, setTitle] = useState('');
  // const [postsCount, setPostsCount] = useState(user?.posts?.length);

  const onLoadMainPosts = useCallback(() => {
    setTitle('');
    setPosts(null);
    // setPostsCount(user.posts.length);

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

      /** will delete. */
      // let newPosts = [...posts];
      // newPosts = newPosts.filter((post) => post.category.name === e.target.dataset.name);
      // setPosts(newPosts);
      // setPostsCount(newPosts.length);

      /**  will use. */
      // const categoryId = e.target.dataset.id;
      // const result = await getPostsOnCategory({ id: categoryId });
      // setPosts(result);
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
        <title>Groom | 글 관리</title>
      </Head>
      <div style={{ marginTop: -20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {title ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CloseButton onClick={onLoadMainPosts}>
                <CloseCircleOutlined />
              </CloseButton>
              <span style={{ fontSize: '18px', marginLeft: '8px' }}>{title} 글</span>
            </div>
          ) : (
            <span style={{ fontSize: '18px' }}>글 관리</span>
          )}
          <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>
            {posts?.length ?? user?.posts?.length}
          </span>
        </div>
        <SearchInput />
        <PostManageList
          posts={posts ?? user?.tempPosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onChangePostList={onChangePostList}
        />
      </div>
      <PaginationContainer
        pageSize={pageSize}
        current={currentPage}
        total={posts?.length ?? user?.posts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManagePost;
