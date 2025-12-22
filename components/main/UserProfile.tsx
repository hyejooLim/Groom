import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar } from "antd";
import { BsCloudFill } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";

import { useGetUser } from "../../hooks/query/user";
import SkeletonUserProfile from "../skeleton/SkeletonUserProfile";
import * as S from "../../styles/ts/components/main/UserProfile";

const UserProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUser();

  useEffect(() => {
    if (isError) {
      const err = error as any;

      alert(err?.response?.data?.message);
      signOut({ redirect: false });
    }
  }, [isError]);

  const handleLogout = () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;

    signOut({ redirect: false });
  };

  return (
    <S.UserProfileWrapper>
      {isLoading ? (
        <SkeletonUserProfile />
      ) : (
        <>
          <S.InfoArea>
            <Link href="/manage" className="go_to_profile">
              <Avatar
                size={80}
                icon={
                  <BsCloudFill style={{ height: "80px", lineHeight: "80px" }} />
                }
                src={user?.imageUrl}
              />
            </Link>
            <S.UserInfo>
              <S.InfoBox>
                <Link href="/manage" className="go_to_profile">
                  <span>{user?.name}님</span>
                </Link>
                <Link href="/write" className="go_to_write">
                  <HiOutlinePencilAlt />
                </Link>
                <div style={{ marginTop: 5, color: "#888" }}>{user?.email}</div>
              </S.InfoBox>
              <S.NewBox>
                <div className="posts">
                  <span>게시글</span>
                  <Link href="/manage/posts">
                    <span className="count">{user?.posts.length}</span>
                  </Link>
                </div>
                <div className="neighbors">
                  <BsFillPersonFill />
                  <Link href="/manage/neighbors">
                    <span className="count">{user?.neighbors.length}</span>
                  </Link>
                </div>
              </S.NewBox>
            </S.UserInfo>
          </S.InfoArea>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </>
      )}
    </S.UserProfileWrapper>
  );
};

export default UserProfile;
