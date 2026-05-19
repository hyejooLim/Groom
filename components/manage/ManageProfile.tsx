import React, { ChangeEvent, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { FiCamera } from 'react-icons/fi';
import { BsCloudFill } from 'react-icons/bs';
import { AiFillMinusSquare } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useGetUser, useUpdateUser } from '../../hooks/query/user';

const ManageProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (isError) {
      const err = error as any;

      alert(err?.response?.data?.message);
      signOut({ redirect: false });
    }
  }, [isError]);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut({ redirect: false });
    }
  };

  const onChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await fetch('/api/s3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          folder: 'profile',
        }),
      });

      const { key, uploadUrl, imageUrl } = await res.json();

      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
      });

      localStorage.setItem('imageKey', key);
      updateUser.mutate(imageUrl);
    } catch (err) {
      console.error('S3 upload error', err);
    }
  };

  const onRemoveProfileImage = async () => {
    if (!confirm('이미지를 삭제하시겠습니까?')) {
      return;
    }

    const key = localStorage.getItem('imageKey');

    try {
      await fetch(`/api/s3?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      localStorage.removeItem('imageKey');
      updateUser.mutate(null);
    } catch (err) {
      console.error('S3 remove error', err);
    }
  };

  return (
    <Card className='w-[240px] border-none shadow-sm overflow-visible'>
      <Box className='relative group w-full h-[200px] bg-background flex items-center justify-center overflow-hidden'>
        {user?.imageUrl ? (
          <img className='w-full h-full object-cover' alt='profile' src={user?.imageUrl} />
        ) : (
          <Box className='flex items-center justify-center text-grey text-[60px]'>
            <BsCloudFill />
          </Box>
        )}

        {user?.imageUrl && (
          <AiFillMinusSquare
            size={24}
            className='absolute -top-1 -right-1 z-10 hidden group-hover:flex cursor-pointer'
            onClick={onRemoveProfileImage}
          />
        )}

        <label className='absolute inset-0 m-auto w-[50px] h-[50px] cursor-pointer hidden group-hover:flex items-center justify-center z-10'>
          <Box className='absolute inset-0 bg-black/50 rounded-full' />
          <FiCamera className='relative z-20 text-white' size={24} />
          <input className='hidden' type='file' accept='image/*' onChange={onChangeProfile} />
        </label>
      </Box>

      <CardContent>
        <Box className='flex justify-between items-start'>
          {isLoading ? (
            <Box className='w-full'>
              <Skeleton width='60%' height={24} />
              <Skeleton width='80%' height={20} />
            </Box>
          ) : (
            <>
              <Box>
                <Typography className='!text-[16px] !leading-tight'>{user?.name}님</Typography>
                <Typography className='!text-[14px] !text-grey !mt-1'>{user?.email}</Typography>
              </Box>
              <Button onClick={handleLogout} className='!p-0 !min-w-[58px] !text-[13px] !text-primary hover:!underline'>
                로그아웃
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ManageProfile;
