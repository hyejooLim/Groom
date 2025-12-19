import React, { useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { CloseCircleOutlined } from "@ant-design/icons";

import ManageLayout from "../../components/layouts/ManageLayout";
import PostManageList from "../../components/manage/PostManageList";
import WrapSearchInput from "../../components/manage/WrapSearchInput";
import { managePostsState } from "../../recoil/manage";
import { useGetUserPosts } from "../../hooks/query/posts";
import {
  useSearchUserPosts,
  useSearchCategoryOnUserPosts,
} from "../../hooks/query/search";
import { TitleWrapper, CloseButton } from "../../styles/ts/common";

const ManagePosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const { data: userPosts, isFetching: isFetchingPosts } = useGetUserPosts();
  const { isFetching: isFetchingSearch } = useSearchUserPosts(
    String(searchKeyword),
    String(searchType)
  );
  const { data: category, isFetching: isFetchingSearchCategory } =
    useSearchCategoryOnUserPosts(Number(categoryId));

  const [managePosts, setManagePosts] = useRecoilState(managePostsState);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManagePosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({
      pathname: "/manage/posts",
      query: { searchKeyword, searchType },
    });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: "/manage/posts", query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 글 관리</title>
        {searchKeyword && (
          <title>Groom | 글 관리 '{searchKeyword}'의 검색결과</title>
        )}
        {categoryId && (
          <title>Groom | 글 관리 '{category?.name}' 카테고리의 글 목록</title>
        )}
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className="text">글 관리</span>
              <span className="count">{userPosts?.length}</span>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/manage/posts">
                <a>
                  <CloseButton>
                    <CloseCircleOutlined
                      {...({} as React.ComponentProps<
                        typeof CloseCircleOutlined
                      >)}
                    />
                  </CloseButton>
                </a>
              </Link>
              {searchKeyword && (
                <>
                  <span className="text title">'{searchKeyword}'</span>
                  <span className="text">검색결과</span>
                </>
              )}
              {categoryId && (
                <>
                  <span className="text title">'{category?.name}'</span>
                  <span className="text">글</span>
                </>
              )}
              <span className="count">{managePosts?.length}</span>
            </div>
          )}
        </TitleWrapper>
        <WrapSearchInput placeholder="글" onSearch={onSearchInput} />
        <PostManageList
          posts={managePosts ?? userPosts}
          isFetching={
            isFetchingSearch || isFetchingSearchCategory || isFetchingPosts
          }
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export default ManagePosts;
