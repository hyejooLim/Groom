import React, { useCallback, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';

import LoginForm from '../main/LoginForm';
import UserProfile from '../main/UserProfile';
import Category from '../main/Category';
import Search from '../main/Search';
import Counter from '../common/Counter';
import { keywordState } from '../../recoil/main';
import logo from '../../public/Groom_Logo_No_Background.png';

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  const setKeyword = useSetRecoilState(keywordState);

  useEffect(() => {
    if (!router.asPath.includes('/search')) {
      setKeyword('');
    }
  }, [router.asPath]);

  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <>
      <Box className='flex h-screen overflow-hidden'>
        {/* Sider */}
        <Box className='w-[300px] p-4 border-r scroll-smooth transition-colors duration-100 overflow-y-auto h-full'>
          {status !== 'unauthenticated' ? <UserProfile /> : <LoginForm />}
          <Category />
          <Counter />
          <Search />
        </Box>

        {/* Main Layout */}
        <Box className='flex flex-col flex-1 h-full py-4 px-6 overflow-y-auto bg-background'>
          {/* Header */}
          <Box className='h-[64px] flex justify-end'>
            <div onClick={onClickLogo} className='cursor-pointer'>
              <Image src={logo} alt='groom_logo' width={140} height={60} />
            </div>
          </Box>

          {/* Content */}
          <Box className='flex-1 p-4'>{children}</Box>

          {/* Footer */}
          <Box className='text-center py-4 text-sm text-gray-500'>Powered by Groom, Designed by sandy</Box>
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
