import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../../components/layouts/ManageLayout';
import SearchInput from '../../components/SearchInput';
import PaginationContainer from '../../components/PaginationContainer';
import PostManageList from '../../components/PostManageList';
import useGetUser from '../../hooks/query/useGetUser';
import { isSearchManagePostsState, managePostsState, managePostsTitleState } from '../../recoil/manage';
import { TitleWrapper, CloseButton } from '../../styles/ts/common';

const pageSize = 5;

const ManagePost = () => {
  const { data: user } = useGetUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [isSearch, setIsSearch] = useRecoilState(isSearchManagePostsState);
  const [managePosts, setManagePosts] = useRecoilState(managePostsState);
  const [managePostsTitle, setManagePostsTitle] = useRecoilState(managePostsTitleState);

  const onLoadMainPosts = useCallback(() => {
    setIsSearch(false);
    setManagePostsTitle('');
    setManagePosts(user.posts);

    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(pageSize);
  }, [user, pageSize]);

  const onChangePostList = useCallback(
    (e: any) => {
      setIsSearch(false);
      setManagePostsTitle(e.target.dataset.name);
      setCurrentPage(1);
      setFirstIndex(0);
      setLastIndex(pageSize);

      const newPosts = user?.posts.filter((post) => post.categoryId === Number(e.target.dataset.id));
      setManagePosts(newPosts);
    },
    [pageSize, user?.posts]
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
        <TitleWrapper>
          {managePostsTitle ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CloseButton onClick={onLoadMainPosts}>
                <CloseCircleOutlined />
              </CloseButton>
              <span className='title text'>{managePostsTitle}</span>
              <span className='text'>{isSearch ? '검색결과' : '글'}</span>
            </div>
          ) : (
            <span className='text'>글 관리</span>
          )}
          <span className='count'>{managePosts?.length}</span>
        </TitleWrapper>
        <SearchInput
          posts={user?.posts}
          setIsSearch={setIsSearch}
          setPosts={setManagePosts}
          setTitle={setManagePostsTitle}
          placeholder='글 관리에서 검색합니다.'
        />
        <PostManageList
          posts={managePosts}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          onChangePostList={onChangePostList}
        />
      </div>
      <PaginationContainer
        pageSize={pageSize}
        current={currentPage}
        total={managePosts?.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManagePost;
