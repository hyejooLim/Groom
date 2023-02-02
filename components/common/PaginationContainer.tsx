import React, { FC } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { PaginationWrapper } from '../../styles/ts/components/common/PaginationContainer';

interface PaginationContainerProps {
  pageSize?: number;
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationContainer: FC<PaginationContainerProps> = ({ pageSize, current, total, onChange }) => {
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
          justifyContent: 'center',
        }}
      />
    </PaginationWrapper>
  );
};

export default PaginationContainer;
