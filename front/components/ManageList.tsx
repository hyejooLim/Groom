import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SettingOutlined } from '@ant-design/icons';

const Container = styled.div`
  margin-top: 20px;
  background-color: #fff;
  height: 260px;
`;

const ListWrapper = styled.ul`
  margin-left: 25px;
  display: flex;
  flex-direction: column;

  & li {
    margin-top: 10px;

    & a {
      color: #000;

      :hover {
        color: #07a;
      }
    }
  }
`;

const ManageList = () => {
  return (
    <>
      <Container>
        <div style={{ borderBottom: '1px solid #f1f3f6' }}>
          <div style={{ fontSize: '18px', fontWeight: '800', padding: '20px 0 20px 25px' }}>
            <SettingOutlined />
            <span style={{ marginLeft: '10px' }}>관리</span>
          </div>
        </div>
        <ListWrapper>
          <li>
            <Link href='/manage-post'>
              <a>
                <span>글 관리</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href='/manage-category'>
              <a>
                <span>카테고리 관리</span>
              </a>
            </Link>
          </li>
        </ListWrapper>
      </Container>
    </>
  );
};

export default ManageList;
