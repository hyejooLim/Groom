import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useGetUserSharedPosts } from '../../hooks/query/posts';

const ManageList = () => {
  const router = useRouter();
  const { data: sharedPosts } = useGetUserSharedPosts();

  const isActive = (path) => router.pathname.includes(path);

  const menuLinkClass = (path) => `
    block w-full py-[3px] pl-[47px] leading-[24px] text-[15px] no-underline transition-colors
    ${isActive(path) ? 'text-[#ff5544] font-bold' : 'text-[#555]'}
    hover:bg-[#f3f5f7]
  `;

  return (
    <Box className='bg-white h-[288px] font-sans rounded-md'>
      <Link href='/manage' className='no-underline'>
        <Box className='flex items-center p-[14px_10px] border-b border-[#f1f3f6] text-[#ff5544] text-[18px] hover:bg-[#fafbfd] cursor-pointer'>
          <HomeOutlinedIcon sx={{ fontSize: 20 }} />
          <span className='ml-[10px]'>블로그 관리 홈</span>
        </Box>
      </Link>

      <Box className='flex flex-col'>
        <Box className='flex items-center p-[14px_10px_5px] text-[18px] font-semibold'>
          <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
          <span className='ml-[10px]'>관리</span>
        </Box>

        <ul className='flex flex-col list-none p-0 m-0'>
          <li>
            <Link href='/manage/posts' className={menuLinkClass('/manage/posts')}>
              글 관리
            </Link>
          </li>
          <li>
            <Link href='/manage/neighbors' className={menuLinkClass('/manage/neighbors')}>
              이웃 관리
            </Link>
          </li>
          <li>
            <Link href='/manage/subscribedPosts' className={menuLinkClass('/manage/subscribedPosts')}>
              구독 글 관리
            </Link>
          </li>
          <li>
            <Link href='/manage/sharedPosts' className={`${menuLinkClass('/manage/sharedPosts')} flex items-center`}>
              공유 글 관리
              {sharedPosts?.some((post) => !post.isVisited) && (
                <span className='!ml-2 w-4 h-4 bg-[#ff5544] text-white text-[10px] flex items-center justify-center rounded-sm font-bold'>
                  N
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href='/manage/category' className={menuLinkClass('/manage/category')}>
              카테고리 관리
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default ManageList;
