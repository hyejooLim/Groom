import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import ManageLayout from '../components/layouts/ManageLayout';
import SearchInput from '../components/SearchInput';
import PostManageList from '../components/PostManageList';
import PaginationContainer from '../components/PaginationContainer';
import { posts } from '.';

const ManagePost = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '18px' }}>글 관리</span>
        <span style={{ fontSize: '14px', color: '#888', marginLeft: '5px' }}>{posts.length}</span>
      </div>
      <SearchInput />
      <PostManageList posts={posts} firstIndex={firstIndex} lastIndex={lastIndex} />
      <PaginationContainer
        posts={posts}
        pageSize={pageSize}
        current={currentPage}
        total={posts.length}
        onChange={onChangePage}
      />
    </ManageLayout>
  );
};

export default ManagePost;
