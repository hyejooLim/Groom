import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { Avatar } from 'antd';
import { BsCloudFill } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';

import { useGetUser } from '../../hooks/query/user';
import { isLogInState } from '../../recoil/auth';
import SkeletonUserProfile from '../skeleton/SkeletonUserProfile';
import * as S from '../../styles/ts/components/main/UserProfile';

const UserProfile = () => {
  const { data: session } = useSession();
  const { data: user, error, refetch, isLoading, isFetching, isError } = useGetUser(session?.user.email);
  const [isLogIn, setIsLogIn] = useRecoilState(isLogInState);

  useEffect(() => {
    if (isLogIn) {
      refetch();
      setIsLogIn(false);
    }
  }, [isLogIn]);

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
    <S.UserProfileWrapper>
      {isLoading || isFetching ? (
        <SkeletonUserProfile />
      ) : (
        <>
          <S.InfoArea>
            <Link href='/manage'>
              <a className='go_to_profile'>
                <Avatar
                  size={80}
                  icon={<BsCloudFill style={{ height: '80px', lineHeight: '80px' }} />}
                  src={user?.imageUrl}
                />
              </a>
            </Link>
            <S.UserInfo>
              <S.InfoBox>
                <Link href='/manage'>
                  <a className='go_to_profile'>
                    <span>{user?.name}님</span>
                  </a>
                </Link>
                <Link href='/write'>
                  <a className='go_to_write'>
                    <HiOutlinePencilAlt />
                  </a>
                </Link>
                <div style={{ marginTop: 5, color: '#888' }}>{user?.email}</div>
              </S.InfoBox>
              <S.NewBox>
                <div className='posts'>
                  <span>게시글</span>
                  <Link href='/manage/posts'>
                    <a>
                      <span className='count'>{user?.posts?.length}</span>
                    </a>
                  </Link>
                </div>
                <div className='neighbors'>
                  <BsFillPersonFill />
                  <Link href='/manage/neighbors'>
                    <a>
                      <span className='count'>{user?.neighbors?.length}</span>
                    </a>
                  </Link>
                </div>
              </S.NewBox>
            </S.UserInfo>
          </S.InfoArea>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </>
      )}
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
