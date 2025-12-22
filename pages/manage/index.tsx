import React from "react";
import Link from "next/link";
import useSWR from "swr";

import ManageLayout from "../../components/layouts/ManageLayout";
import SkeletonLastPosts from "../../components/skeleton/SkeletonLastPosts";
import { useGetUserPosts } from "../../hooks/query/posts";
import { VisitorsCount } from "../../types";
import * as S from "../../styles/ts/pages/manage";

const renderEmptyBox = (length: number) => {
  let emptyBoxes = [];

  for (let i = 0; i < 4 - length; i++) {
    emptyBoxes.push(<S.EmptyBox>No Post</S.EmptyBox>);
  }

  return emptyBoxes;
};

const Manage = () => {
  const { data: userPosts, isLoading } = useGetUserPosts();
  const { data: visitors } = useSWR<VisitorsCount>("/count");

  return (
    <ManageLayout>
      <S.CountVisitorWrapper>
        <S.CountVisitor style={{ marginRight: "50px" }}>
          <div className="title">오늘 방문 수</div>
          <div className="number">{visitors?.todayCount.toLocaleString()}</div>
        </S.CountVisitor>
        <S.CountVisitor>
          <div className="title">누적 방문 수</div>
          <div className="number">{visitors?.totalCount.toLocaleString()}</div>
        </S.CountVisitor>
      </S.CountVisitorWrapper>
      <S.LastPosts>
        <span style={{ fontSize: "20px" }}>최근 작성 글</span>
        {isLoading ? (
          <SkeletonLastPosts />
        ) : (
          <ul>
            <>
              {userPosts?.slice(0, 4).map((post) => (
                <li key={post.id}>
                  <Link href={`/post/${post.id}`}>
                    <S.PostTitle>{`[${post.category?.name}] ${post.title}`}</S.PostTitle>
                    <S.PostContent>{post.content.slice(0, 60)}</S.PostContent>
                  </Link>
                  <S.InfoWrapper>
                    <span>댓글 {post.comments?.length}</span>
                    <span>공감 {post.likers?.length}</span>
                  </S.InfoWrapper>
                </li>
              ))}
              {userPosts?.length < 4 && renderEmptyBox(userPosts.length)}
            </>
          </ul>
        )}
      </S.LastPosts>
    </ManageLayout>
  );
};

export default Manage;
