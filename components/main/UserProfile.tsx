import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';

import { useGetUser } from '../../hooks/query/user';
import SkeletonUserProfile from '../skeleton/SkeletonUserProfile';

const UserProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUser();

  useEffect(() => {
    if (isError) {
      const err = error as any;

      alert(err?.response?.data?.message);
      signOut({ redirect: false });
    }
  }, [isError]);

  const handleLogout = () => {
    if (!confirm('로그아웃 하시겠습니까?')) return;

    signOut({ redirect: false });
  };

  return (
    <div className='flex flex-col items-center justify-center w-full my-2 h-60'>
      {isLoading ? (
        <SkeletonUserProfile />
      ) : (
        <>
          <div className='flex flex-col justify-between items-center gap-y-8'>
            <div className='flex items-center'>
              <Link href='/manage' className='mr-8'>
                <Avatar sx={{ width: 80, height: 80 }} src={user?.imageUrl}>
                  <CloudIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Link>
              <div>
                <div className='flex items-center gap-x-4'>
                  <Link href='/manage'>
                    <span className='text-2xl font-bold'>{user?.name}님</span>
                  </Link>
                  <Link href='/write' className='text-accent hover:text-accent/80'>
                    <HiOutlinePencilAlt size={22} />
                  </Link>
                </div>
                <div className='mt-1 text-grey'>{user?.email}</div>
                <div className='flex mt-4'>
                  <div className='border-r border-r-border flex items-center mr-3 pr-3'>
                    <span>게시글</span>
                    <Link href='/manage/posts' className='ml-2'>
                      <span>{user?.posts.length}</span>
                    </Link>
                  </div>
                  <div className='flex items-center'>
                    <BsFillPersonFill />
                    <Link href='/manage/neighbors' className='ml-2'>
                      <span>{user?.neighbors.length}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Button variant='contained' className='!bg-primary !text-white' onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
