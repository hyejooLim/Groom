import React, { FC } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';

import { PostType } from '../types';

interface PaginationProps {
  posts: PostType[];
  pageSize?: number;
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationContainer: FC<PaginationProps> = ({ posts, pageSize, current, total, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        pageSize={pageSize}
        current={current}
        total={posts.length}
        onChange={onChange}
        style={{
          listStyle: 'none',
          padding: 0,
          width: 'auto',
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      />
    </div>
  );
};

export default PaginationContainer;
