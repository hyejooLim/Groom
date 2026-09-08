import React, { MouseEvent, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Router from 'next/router';
import Image from 'next/image';
import { Avatar, Button, Popover } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import logo from '../../../public/Groom_Logo_No_Background.png';

const EditorToolbar = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { data: session } = useSession();

  const handleToggleShowInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const handleRouteHome = () => {
    const confirm = window.confirm('홈페이지로 돌아가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
    if (confirm) {
      Router.push('/');
    }
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut({ redirect: false });
    }
  };

  const title = (
    <div className='my-2 mx-1'>
      <p className='text-md'>{session?.user.name}</p>
      <p className='text-grey font-light'>{session?.user.email}</p>
    </div>
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    handleToggleShowInfo?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleToggleShowInfo?.();
  };

  const open = Boolean(anchorEl) || showInfo;

  return (
    <div className='fixed top-0 z-1 h-[70px] w-full min-w-[944px] border-b border-black/[0.05] bg-white transition-opacity duration-500'>
      <div className='absolute left-0 top-0 z-20 m-[8px_0_0_34px] border-0 bg-transparent p-0 outline-none max-[1060px]:hidden'>
        <Image
          src={logo}
          alt='groom_logo'
          width={140}
          height={60}
          onClick={handleRouteHome}
          className='cursor-pointer'
        />
      </div>
      <div className='fixed right-0 top-0 z-20 mr-5 mt-[18px] flex items-center max-[1060px]:hidden'>
        <span>{session?.user.name}</span>
        <div>
          <div onClick={handleClick} className='mx-[34px] my-0 ml-[14px] inline-block cursor-pointer'>
            <Avatar sx={{ width: 32, height: 32 }}>
              <PersonOutlineOutlinedIcon />
            </Avatar>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div className='p-4 flex flex-col items-end'>
              {title && <div className='font-bold'>{title}</div>}
              <Button onClick={handleLogout}>로그아웃</Button>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
