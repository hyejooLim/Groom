import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

import ManageLayout from '../components/layouts/ManageLayout';
import { user } from '.';

const CountVisitorWrapper = styled.div`
  background-color: #fff;
  height: 105px;
  display: flex;
  margin-top: 20px;
`;

const CountVisitor = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 100px 0 30px;

  & .title {
    font-size: 15px;
    font-family: Noto Sans Medium, AppleSDGothicNeo-Regular, 'Malgun Gothic', '맑은 고딕', dotum, '돋움', sans-serif;
    color: #555;
  }

  & .number {
    padding: 5px 0 0;
    font-weight: bold;
    font-size: 20px;
    font-family: 'Avenir Next Regular', AppleSDGothicNeo, '돋움', dotum, sans-serif;
    color: #000;
  }
`;

const LastPost = styled.div`
  margin-top: 54px;

  & ul {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    & li {
      float: left;
      position: relative;
      width: 224px;
      height: 246px;
      border: 1px solid #e0e5ee;
      background: #fff;

      & a {
        color: #333;
        display: block;
        margin: 26px 24px 0;

        &:hover :first-child {
          text-decoration: underline;
        }
      }
    }
  }
`;

const PostTitle = styled.p`
  max-height: 60px;
  line-height: 20px;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: normal;
  font-family: 'Noto Sans Regular', AppleSDGothicNeo, '돋움', dotum, sans-serif;
`;

const PostContent = styled.p`
  max-height: 90px;
  line-height: 18px;
  margin: 0;
  font-size: 12px;
  color: #808080;
`;

const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 41px;
  padding: 0 24px 19px 23px;
  color: #777;
  letter-spacing: -0.2px;
  box-sizing: border-box;

  & span {
    display: block;
    overflow: hidden;
    float: left;
    position: relative;
    margin: 4px 12px 0 0;
    font-size: 12px;
    font-family: 'Avenir Next Regular', 'Noto Sans DemiLight', AppleSDGothicNeo, '돋움', dotum, sans-serif;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :last-child::after {
    content: '';
    display: block;
    position: absolute;
    top: 9px;
    left: 59px;
    width: 2px;
    height: 2px;
    background-color: #c5c5c5;
  }
`;

const Manage = () => {
  const [todayVisitorNumber, setTodayVisitorNumber] = useState(23);
  const [totalVisitorNumber, setTotalVisitorNumber] = useState(1500);
  
  return (
    <ManageLayout>
      <CountVisitorWrapper>
        <CountVisitor>
          <span className='title'>오늘 방문 수</span>
          <span className='number'>{todayVisitorNumber}</span>
        </CountVisitor>
        <CountVisitor>
          <span className='title'>누적 방문 수</span>
          <span className='number'>{totalVisitorNumber}</span>
        </CountVisitor>
      </CountVisitorWrapper>
      <LastPost>
        <span style={{ fontWeight: 700, fontSize: '18px' }}>최근 작성 글</span>
        <ul>
          {user.posts?.slice(0, 4).map((post) => (
            <li key={post.id}>
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a>
                  <PostTitle>{`[${post.Category.name}] ${post.title}`}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                </a>
              </Link>
              <InfoWrapper>
                <span>댓글 {post.Comments.length}</span>
                <span>공감 {post.likeCount}</span>
              </InfoWrapper>
            </li>
          ))}
        </ul>
      </LastPost>
    </ManageLayout>
  );
};

export default Manage;
