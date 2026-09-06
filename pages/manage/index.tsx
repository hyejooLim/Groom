import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Box, Typography } from '@mui/material';

import ManageLayout from '../../components/layouts/ManageLayout';
import SkeletonLastPosts from '../../components/skeleton/SkeletonLastPosts';
import useBreakdown from '../../hooks/common/breakdown';
import { useGetUserPosts } from '../../hooks/query/posts';
import { VisitorsCount } from '../../types';

const Manage = () => {
  const { data: userPosts, isLoading } = useGetUserPosts();
  const { data: visitors } = useSWR<VisitorsCount>('/count');

  const { isDesktop, isTablet } = useBreakdown();
  const displayCount = isDesktop ? 5 : isTablet ? 4 : 2;
  const slicedPosts = userPosts?.slice(0, displayCount) || [];

  const renderEmptyBoxes = (currentLength: number, capacity: number) => {
    const emptyCount = capacity - currentLength;
    if (emptyCount <= 0) return null;

    return Array.from({ length: emptyCount }).map((_, i) => (
      <Box
        key={`empty-${i}`}
        className='w-[217px] h-[246px] border border-[#e0e5ee] bg-white flex items-center justify-center text-[#777] text-[18px] font-sans'
      >
        No Post
      </Box>
    ));
  };

  return (
    <ManageLayout>
      <Box className='flex p-[25px_30px] mt-[20px] h-[105px] border border-[#e0e5ee] bg-white rounded-sm'>
        <Box className='mr-[50px]'>
          <Typography className='!text-[15px] !text-dark !font-medium font-sans'>오늘 방문 수</Typography>
          <Typography className='!text-[20px] !font-bold !text-black !pt-1 font-mono'>
            {visitors?.todayCount.toLocaleString() ?? 0}
          </Typography>
        </Box>
        <Box>
          <Typography className='!text-[15px] !text-dark !font-medium font-sans'>누적 방문 수</Typography>
          <Typography className='!text-[20px] !font-bold !text-black !pt-1 font-mono'>
            {visitors?.totalCount.toLocaleString() ?? 0}
          </Typography>
        </Box>
      </Box>

      <Box className='mt-[54px] w-full'>
        <Typography className='!text-2xl !mb-4'>최근 작성 글</Typography>
        {isLoading ? (
          <SkeletonLastPosts />
        ) : (
          <ul className='flex gap-[12px] w-full p-0 m-0 list-none'>
            {slicedPosts.map((post) => (
              <li
                key={post.id}
                className='relative w-[217px] h-[246px] border border-[#e0e5ee] bg-white group transition-shadow hover:shadow-md'
              >
                <Link href={`/post/${post.id}`} className='block m-[26px_24px_0] no-underline text-[#333]'>
                  <Typography className='max-h-[60px] !leading-[20px] !mb-[12px] !text-[16px] !font-semibold group-hover:underline line-clamp-3'>
                    {`[${post.category?.name}] ${post.title}`}
                  </Typography>
                  <Typography className='max-h-[90px] !leading-[18px] !text-[13px] !text-[#808080] line-clamp-5'>
                    {post.content.replace(/<[^>]*>?/gm, '').slice(0, 80)}
                  </Typography>
                </Link>

                <Box className='absolute bottom-0 left-0 w-full h-[41px] p-[0_24px_19px_23px] flex items-center text-[#777] text-[13px]'>
                  <span className="relative mr-[15px] flex items-center after:content-[''] after:absolute after:right-[-8px] after:w-[2px] after:h-[2px] after:bg-[#c5c5c5] after:rounded-full">
                    댓글 {post.comments?.length ?? 0}
                  </span>
                  <span>공감 {post.likers?.length ?? 0}</span>
                </Box>
              </li>
            ))}

            {renderEmptyBoxes(slicedPosts.length, displayCount)}
          </ul>
        )}
      </Box>
    </ManageLayout>
  );
};

export default Manage;
