import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface PaginationContainerProps {
  pageSize?: number;
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationContainer: FC<PaginationContainerProps> = ({ pageSize = 10, current, total, onChange }) => {
  const safeTotal = Number(total) || 0;
  const safePageSize = Number(pageSize) || 10;
  const count = Math.ceil(safeTotal / safePageSize);

  const safeCurrent = Number(current) || 1;

  return (
    <div className='flex justify-center'>
      <Pagination
        page={safeCurrent}
        count={count}
        onChange={(_, page) => onChange(page)}
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              sx={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: '15px',
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                  color: '#13a085',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#13a085',
                },
              }}
            />
          );
        }}
        className='w-[300px] mt-[30px] flex justify-center'
      />
    </div>
  );
};

export default PaginationContainer;
