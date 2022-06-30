import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { PostItem } from '../types';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  /* 숫자 */
  .ant-pagination-item {
    border: none;
    background-color: transparent;
  }

  & a {
    font-family: 'Courier New', Courier, monospace;
    font-size: 15px;
  }

  & .ant-pagination-item-active a {
    color: #07a;
  }

  & .ant-pagination-item a:hover {
    color: #07a;
  }
`;

interface PaginationContainerProps {
  posts: PostItem[];
  pageSize?: number;
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationContainer: FC<PaginationContainerProps> = ({ posts, pageSize, current, total, onChange }) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>PREV</a>;
    }

    if (type === 'next') {
      return <a>NEXT</a>;
    }

    if (type === 'jump-prev' || type === 'jump-next') {
      return '...';
    }

    return originalElement;
  };

  return (
    <PaginationWrapper>
      <Pagination
        pageSize={pageSize}
        current={current}
        total={total}
        onChange={onChange}
        itemRender={itemRender}
        style={{
          width: '300px',
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      />
    </PaginationWrapper>
  );
};

export default PaginationContainer;
