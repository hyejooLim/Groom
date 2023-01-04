import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { useGetUserSharedPosts } from '../../hooks/query/posts';
import { NewIcon } from '../../styles/ts/common';
import * as S from '../../styles/ts/components/manage/ManageList';

const ManageList = () => {
  const router = useRouter();
  const { data: sharedPosts } = useGetUserSharedPosts();

  return (
    <>
      <S.Container>
        <Link href='/manage'>
          <S.LinkWrapper>
            <a className='link_menu'>
              <HomeOutlined />
              <span>블로그 관리 홈</span>
            </a>
          </S.LinkWrapper>
        </Link>
        <S.WrapMenu>
          <div>
            <SettingOutlined />
            <span>관리</span>
          </div>
          <S.ListWrapper>
            <Link href='/manage/posts'>
              <li>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/posts') })}>글 관리</a>
              </li>
            </Link>
            <Link href='/manage/neighbors'>
              <li>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/neighbors') })}>
                  이웃 관리
                </a>
              </li>
            </Link>
            <Link href='/manage/subscribedPosts'>
              <li>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/subscribedPosts') })}>
                  구독 글 관리
                </a>
              </li>
            </Link>
            <Link href='/manage/sharedPosts'>
              <li>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/sharedPosts') })}>
                  공유 글 관리
                </a>
                {sharedPosts?.find((post) => !post.isVisited) && <NewIcon>N</NewIcon>}
              </li>
            </Link>
            <Link href='/manage/category'>
              <li>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/category') })}>
                  카테고리 관리
                </a>
              </li>
            </Link>
          </S.ListWrapper>
        </S.WrapMenu>
      </S.Container>
    </>
  );
};

export default ManageList;
