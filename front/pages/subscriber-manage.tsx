import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';

import ManageLayout from '../components/layouts/ManageLayout';
import { user } from '.';

const SubscribeCancelButton = styled(Button)`
  width: 85px;
  font-size: 13px;
  float: right;
  display: none;
  color: #333;
  border: 1px solid #c5cdd7;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
  background-color: #fff;

  :hover {
    border-color: #808080;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
  }
`;

const ListWrapper = styled.div`
  background-color: #fff;
  margin-top: 8px;
  line-height: 180%;
  word-break: break-all; // ?

  & ul {
    border: 1px solid #e0e5ee;
  }

  & li {
    padding: 13px 16px 12px;
    font-size: 14px;
    border-bottom: 1px solid #f1f3f6;

    &:hover {
      background-color: #fafbfd;

      ${SubscribeCancelButton} {
        display: block;
      }
    }
  }
`;

const SubscriberInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .main_info {
    display: flex;
    align-items: center;

    .subscriber_name {
      font-size: 16px;
      margin-right: 8px;

      :hover {
        text-decoration: underline;
        color: inherit;
        cursor: pointer;
      }
    }
    
    .subscriber_email {
      color: #808080;
    }
  }

  .extra_info {
    color: #808080;

    & span:not(:first-child) {
      :before {
        display: inline-block;
        width: 2px;
        height: 2px;
        margin: 11px 8px 0;
        border-radius: 2px;
        background: #c5cdd7;
        vertical-align: top;
        content: '';
      }
    }
  }
`;

const SubscriberManage = () => {
  const handleCancelSubscribe = (subscriber: string) => {
    const confirm = window.confirm(`${subscriber}님 구독을 취소하시겠습니까?`);
    if (!confirm) {
      return;
    }

    // 구독 취소 액션
    // user.subscribers에서 제거
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 구독자 관리</title>
      </Head>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '18px' }}>구독자 관리</span>
        <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>{user.subscribers?.length}</span>
      </div>
      <ListWrapper>
        <ul>
          {user.subscribers?.map((subscriber) => (
            <li>
              <SubscriberInfo>
                <div>
                  <div className='main_info'>
                    <Link
                      href={{ pathname: `/user/${subscriber.id}`, query: { user: JSON.stringify(subscriber) } }}
                      as={`/user/${subscriber.id}`}
                    >
                      <a className='subscriber_name'>
                        <span>{subscriber.name}</span>
                      </a>
                    </Link>
                    <span className='subscriber_email'>{subscriber.email}</span>
                  </div>
                  <div className='extra_info'>
                    <span>구독자 {subscriber.subscribers.length}</span>
                    <span>게시글 {subscriber.posts.length}</span>
                  </div>
                </div>
                <SubscribeCancelButton onClick={() => handleCancelSubscribe(subscriber.name)}>
                  구독 취소
                </SubscribeCancelButton>
              </SubscriberInfo>
            </li>
          ))}
        </ul>
      </ListWrapper>
    </ManageLayout>
  );
};

export default SubscriberManage;
