import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

const Container = styled.div`
  margin-top: 10px;
  background-color: #fff;
  height: 258px;
  font-family: Noto Sans Regular, AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
`;

const LinkWrapper = styled.div`
  border-bottom: 1px solid #f1f3f6;
  padding: 14px 10px;

  :hover {
    cursor: pointer;
    background-color: #fafbfd;
  }

  .link_menu {
    color: #ff5544;
    font-size: 17px;

    & span {
      margin-left: 10px;
    }
  }
`;

const WrapMenu = styled.div`
  & div {
    font-size: 17px;
    font-weight: 600;
    padding: 14px 10px 5px;

    & span {
      margin-left: 10px;
    }
  }
`;

const ListWrapper = styled.ul`
  margin-left: 25px;
  display: flex;
  flex-direction: column;

  & li {
    margin: 8px 0 0 8px;

    & a {
      color: #000;
      margin-left: 14px;

      :hover {
        color: #ff5544;
      }
    }
  }
`;

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
              <Link href='/post-manage'>
                <a>글 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/category-manage'>
                <a>카테고리 관리</a>
              </Link>
            </li>
            <li>
              <Link href='/subscriber-manage'>
                <a>구독자 관리</a>
              </Link>
            </li>
          </ListWrapper>
        </WrapMenu>
      </Container>
    </>
  );
};

export default ManageList;
