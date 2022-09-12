import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Container, LinkWrapper, WrapMenu, ListWrapper } from '../styles/ts/components/ManageList';

const ManageList = () => {
  const router = useRouter();

  return (
    <>
      <Container>
        <LinkWrapper>
          <Link href='/manage'>
            <a className='link_menu'>
              <HomeOutlined />
              <span>블로그 관리 홈</span>
            </a>
          </Link>
        </LinkWrapper>
        <WrapMenu>
          <div>
            <SettingOutlined />
            <span>관리</span>
          </div>
          <ListWrapper>
            <li>
              <Link href='/manage/post'>
                <a className={classNames('list_menu', { on: router.pathname === '/manage/post' })}>글 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/manage/subscribedPost'>
                <a className={classNames('list_menu', { on: router.pathname === '/manage/subscribedPost' })}>
                  구독 글 관리
                </a>
              </Link>
            </li>
            <li>
              <Link href='/manage/category'>
                <a className={classNames('list_menu', { on: router.pathname === '/manage/category' })}>카테고리 관리</a>
              </Link>
            </li>
          </ListWrapper>
        </WrapMenu>
      </Container>
    </>
  );
};

export default ManageList;
