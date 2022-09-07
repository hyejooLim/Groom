import Link from 'next/link';
import React, { useState } from 'react';

import ManageLayout from '../../components/layouts/ManageLayout';
import useGetUser from '../../hooks/query/useGetUser';
import {
  CountVisitorWrapper,
  CountVisitor,
  LastPosts,
  PostTitle,
  PostContent,
  InfoWrapper,
} from '../../styles/ts/pages/manage';

const Manage = () => {
  const { data: user } = useGetUser();
  const [todayVisitorNumber, setTodayVisitorNumber] = useState(23);
  const [totalVisitorNumber, setTotalVisitorNumber] = useState(1500);

  return (
    <ManageLayout>
      <CountVisitorWrapper>
        <CountVisitor style={{ marginRight: '50px' }}>
          <div className='title'>오늘 방문 수</div>
          <div className='number'>{todayVisitorNumber}</div>
        </CountVisitor>
        <CountVisitor>
          <div className='title'>누적 방문 수</div>
          <div className='number'>{totalVisitorNumber}</div>
        </CountVisitor>
      </CountVisitorWrapper>
      <LastPosts>
        <span style={{ fontWeight: 700, fontSize: '18px' }}>최근 작성 글</span>
        <ul>
          {user?.posts?.slice(0, 4).map((post) => (
            <li key={post.id}>
              <Link
                href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                as={`/post/${post.id}`}
              >
                <a>
                  <PostTitle>{`[${post.category?.name}] ${post.title}`}</PostTitle>
                  <PostContent>{post.content.slice(0, 60)}</PostContent>
                </a>
              </Link>
              <InfoWrapper>
                <span>댓글 {post.comments?.length}</span>
                <span>공감 {post.likers?.length}</span>
              </InfoWrapper>
            </li>
          ))}
        </ul>
      </LastPosts>
    </ManageLayout>
  );
};

export default Manage;
