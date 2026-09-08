import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import Container from '@mui/material/Container';

import ManageProfile from '../manage/ManageProfile';
import ManageWrite from '../manage/ManageWrite';
import ManageList from '../manage/ManageList';
import logo from '../../../public/Groom_Logo_No_Background.png';

const ManageLayout = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인 후 이용하실 수 있습니다.');
      Router.push('/login');
    }
  }, [status]);

  return (
    <>
      <Container maxWidth={false} className='flex relative h-full mx-auto items-center bg-background'>
        {/* sidebar */}
        <Box component='aside' sx={{ minWidth: '240px' }}>
          <ManageProfile />
          <ManageWrite />
          <ManageList />
        </Box>

        {/* main */}
        <Box className='ml-[30px] w-full'>
          <Box component='header' className='h-48'>
            <Box className='flex justify-center'>
              <Link href='/'>
                <Image src={logo} alt='groom_logo' width={160} height={70} priority />
              </Link>
            </Box>

            <Link href='/write' className='flex justify-end'>
              <Button
                variant='contained'
                endIcon={<HiOutlinePencilAlt />}
                className='!w-[110px] !h-[42px] !bg-primary !mt-[30px] !text-lg !text-white !rounded-[24px] transition-all duration-200 ease-in hover:!scale-102 active:!bg-primary'
              >
                글쓰기
              </Button>
            </Link>
          </Box>

          <Box component='main'>{children}</Box>
        </Box>
      </Container>
    </>
  );
};

export default ManageLayout;
