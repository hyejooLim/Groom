import React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { todayCountState, totalCountState } from '../../recoil/count';
import ManageLayout from '../../components/layouts/ManageLayout';
import useGetUser from '../../hooks/query/useGetUser';
import * as S from '../../styles/ts/pages/manage';

const Manage = () => {
  const { data: user } = useGetUser();
  const todayCount = useRecoilValue(todayCountState);
  const totalCount = useRecoilValue(totalCountState);

  const renderEmptyBox = (length: number) => {
    let emptyBoxes = [];

    for (let i = 0; i < 4 - length; i++) {
      emptyBoxes.push(<S.EmptyBox>No Post</S.EmptyBox>);
    }

    return emptyBoxes;
  };

  return (
    <ManageLayout>
      <S.CountVisitorWrapper>
        <S.CountVisitor style={{ marginRight: '50px' }}>
          <div className='title'>오늘 방문 수</div>
          <div className='number'>{todayCount}</div>
        </S.CountVisitor>
        <S.CountVisitor>
          <div className='title'>누적 방문 수</div>
          <div className='number'>{totalCount}</div>
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
            {user?.posts?.length < 4 && renderEmptyBox(user?.posts.length)}
          </>
        </ul>
      </S.LastPosts>
    </ManageLayout>
  );
};

export default Manage;
