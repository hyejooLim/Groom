import React from 'react';
import Link from 'next/link';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

import { Container, LinkWrapper, WrapMenu, ListWrapper } from '../styles/ts/components/ManageList';

const ManageList = () => {
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
                <a>글 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/manage/subscribedPost'>
                <a>구독 글 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/manage/category'>
                <a>카테고리 관리</a>
              </Link>
            </li>
          </ListWrapper>
        </WrapMenu>
      </Container>
    </>
  );
};

export default ManageList;
