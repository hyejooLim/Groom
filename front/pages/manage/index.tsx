import React, { useState } from 'react';
import Link from 'next/link';

import ManageLayout from '../../components/layouts/ManageLayout';
import useGetUser from '../../hooks/query/useGetUser';
import * as S from '../../styles/ts/pages/manage';

const Manage = () => {
  const { data: user } = useGetUser();
  const [todayVisitorNumber, setTodayVisitorNumber] = useState(23);
  const [totalVisitorNumber, setTotalVisitorNumber] = useState(1500);

  const renderEmptyBox = () => {
    let emptyBoxes = [];

    for (let i = 0; i < 4 - user?.posts.length; i++) {
      emptyBoxes.push(<S.EmptyBox>No Post</S.EmptyBox>);
    }

    return emptyBoxes;
  };

  return (
    <ManageLayout>
      <S.CountVisitorWrapper>
        <S.CountVisitor style={{ marginRight: '50px' }}>
          <div className='title'>오늘 방문 수</div>
          <div className='number'>{todayVisitorNumber}</div>
        </S.CountVisitor>
        <S.CountVisitor>
          <div className='title'>누적 방문 수</div>
          <div className='number'>{totalVisitorNumber}</div>
        </S.CountVisitor>
      </S.CountVisitorWrapper>
      <S.LastPosts>
        <span style={{ fontSize: '20px' }}>최근 작성 글</span>
        <ul>
          <>
            {user?.posts?.slice(0, 4).map((post) => (
              <li key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <a>
                    <S.PostTitle>{`[${post.category?.name}] ${post.title}`}</S.PostTitle>
                    <S.PostContent>{post.content.slice(0, 60)}</S.PostContent>
                  </a>
                </Link>
                <S.InfoWrapper>
                  <span>댓글 {post.comments?.length}</span>
                  <span>공감 {post.likers?.length}</span>
                </S.InfoWrapper>
              </li>
            ))}
            {user?.posts?.length < 4 && renderEmptyBox()}
          </>
        </ul>
      </S.LastPosts>
    </ManageLayout>
  );
};

export default Manage;
