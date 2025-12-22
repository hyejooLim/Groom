import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import classNames from "classnames";

import { useGetUserSharedPosts } from "../../hooks/query/posts";
import { NewIcon } from "../../styles/ts/common";
import * as S from "../../styles/ts/components/manage/ManageList";

const ManageList = () => {
  const router = useRouter();
  const { data: sharedPosts } = useGetUserSharedPosts();

  return (
    <>
      <S.Container>
        <Link href="/manage" className="link_menu">
          <S.LinkWrapper>
            <HomeOutlined
              {...({} as React.ComponentProps<typeof HomeOutlined>)}
            />
            <span>블로그 관리 홈</span>
          </S.LinkWrapper>
        </Link>
        <S.WrapMenu>
          <div>
            <SettingOutlined
              {...({} as React.ComponentProps<typeof SettingOutlined>)}
            />
            <span>관리</span>
          </div>
          <S.ListWrapper>
            <Link
              href="/manage/posts"
              className={classNames("list_menu", {
                on: router.pathname.includes("/manage/posts"),
              })}
            >
              <li>글 관리</li>
            </Link>
            <Link
              href="/manage/neighbors"
              className={classNames("list_menu", {
                on: router.pathname.includes("/manage/neighbors"),
              })}
            >
              <li>이웃 관리</li>
            </Link>
            <Link
              href="/manage/subscribedPosts"
              className={classNames("list_menu", {
                on: router.pathname.includes("/manage/subscribedPosts"),
              })}
            >
              <li>구독 글 관리</li>
            </Link>
            <Link
              href="/manage/sharedPosts"
              className={classNames("list_menu", {
                on: router.pathname.includes("/manage/sharedPosts"),
              })}
            >
              <li>
                공유 글 관리
                {sharedPosts?.find((post) => !post.isVisited) && (
                  <NewIcon>N</NewIcon>
                )}
              </li>
            </Link>
            <Link
              href="/manage/category"
              className={classNames("list_menu", {
                on: router.pathname.includes("/manage/category"),
              })}
            >
              <li>카테고리 관리</li>
            </Link>
          </S.ListWrapper>
        </S.WrapMenu>
      </S.Container>
    </>
  );
};

export default ManageList;
