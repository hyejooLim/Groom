import React, { useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { CloseCircleOutlined } from "@ant-design/icons";

import ManageLayout from "../../components/layouts/ManageLayout";
import SearchInput from "../../components/manage/WrapSearchInput";
import SharedPostManageList from "../../components/manage/SharedPostManageList";
import { useGetUserSharedPosts } from "../../hooks/query/posts";
import {
  useSearchUserSharedPosts,
  useSearchCategoryOnUserSharedPosts,
} from "../../hooks/query/search";
import { manageSharedPostsState } from "../../recoil/manage";
import { CloseButton, TitleWrapper } from "../../styles/ts/common";

const ManageSharedPosts = () => {
  const router = useRouter();
  const { category: categoryId, searchKeyword, searchType } = router.query;

  const { data: userSharedPosts, isFetching: isFetchingSharedPosts } =
    useGetUserSharedPosts();
  const { isFetching: isFetchingSearch } = useSearchUserSharedPosts(
    String(searchKeyword),
    String(searchType)
  );
  const { data: sharedInfo, isFetching: isFetchingSearchCategory } =
    useSearchCategoryOnUserSharedPosts(Number(categoryId));

  const [manageSharedPosts, setManageSharedPosts] = useRecoilState(
    manageSharedPostsState
  );

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setManageSharedPosts(null);
    }
  }, [router.query]);

  const onSearchInput = (searchKeyword: string, searchType: string) => {
    Router.push({
      pathname: "/manage/sharedPosts",
      query: { searchKeyword, searchType },
    });
  };

  const onClickCategory = (id: number) => {
    Router.push({ pathname: "/manage/sharedPosts", query: { category: id } });
  };

  return (
    <ManageLayout>
      <Head>
        <title>Groom | 공유 글 관리</title>
        {searchKeyword && (
          <title>Groom | 공유 글 관리 '{searchKeyword}'의 검색결과</title>
        )}
        {sharedInfo && (
          <title>
            Groom | 공유 글 관리 '{sharedInfo[0].post?.category?.name}'
            카테고리의 글 목록
          </title>
        )}
      </Head>
      <div style={{ marginTop: -20 }}>
        <TitleWrapper>
          {Object.keys(router.query).length === 0 ? (
            <>
              <span className="text">공유 글 관리</span>
              <span className="count">{userSharedPosts?.length}</span>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/manage/sharedPosts">
                <CloseButton>
                  <CloseCircleOutlined
                    {...({} as React.ComponentProps<
                      typeof CloseCircleOutlined
                    >)}
                  />
                </CloseButton>
              </Link>
              {searchKeyword && (
                <>
                  <span className="text title">'{searchKeyword}'</span>
                  <span className="text">검색결과</span>
                </>
              )}
              {categoryId && (
                <>
                  <span className="text title">
                    '{sharedInfo && sharedInfo[0].post.category.name}'
                  </span>
                  <span className="text">글</span>
                </>
              )}
              <span className="count">{manageSharedPosts?.length}</span>
            </div>
          )}
        </TitleWrapper>
        <SearchInput
          placeholder="공유 글"
          newSearchTypes={[{ key: "sender", label: "공유자" }]}
          onSearch={onSearchInput}
        />
        <SharedPostManageList
          sharedPosts={manageSharedPosts ?? userSharedPosts}
          isFetching={
            isFetchingSearch ||
            isFetchingSearchCategory ||
            isFetchingSharedPosts
          }
          onClickCategory={onClickCategory}
        />
      </div>
    </ManageLayout>
  );
};

export default ManageSharedPosts;
