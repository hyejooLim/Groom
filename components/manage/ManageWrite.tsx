import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';

const ManageWrite = () => {
  return (
    <Link href='/write' className='block no-underline'>
      <Box className='my-2 bg-dark-grey px-5 py-4 transition-colors duration-200 hover:bg-dark-grey/80 cursor-pointer rounded-md'>
        <span className='text-white text-lg'>글 쓰러가기</span>
      </Box>
    </Link>
  );
};

export default ManageWrite;
