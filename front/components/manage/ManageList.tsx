import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import * as S from '../../styles/ts/components/manage/ManageList';

const ManageList = () => {
  const router = useRouter();

  return (
    <>
      <S.Container>
        <S.LinkWrapper>
          <Link href='/manage'>
            <a className='link_menu'>
              <HomeOutlined />
              <span>블로그 관리 홈</span>
            </a>
          </Link>
        </S.LinkWrapper>
        <S.WrapMenu>
          <div>
            <SettingOutlined />
            <span>관리</span>
          </div>
          <S.ListWrapper>
            <li>
              <Link href='/manage/posts'>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/posts') })}>글 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/manage/neighbors'>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/neighbors') })}>
                  이웃 관리
                </a>
              </Link>
            </li>
            <li>
              <Link href='/manage/subscribedPosts'>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/subscribedPosts') })}>
                  구독 글 관리
                </a>
              </Link>
            </li>
            <li>
              <Link href='/manage/category'>
                <a className={classNames('list_menu', { on: router.pathname.includes('/manage/category') })}>
                  카테고리 관리
                </a>
              </Link>
            </li>
          </S.ListWrapper>
        </S.WrapMenu>
      </S.Container>
    </>
  );
};

export default ManageList;
