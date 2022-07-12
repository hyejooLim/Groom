import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';
import { PaperClipOutlined, CloseCircleOutlined } from '@ant-design/icons';

import ManageLayout from '../components/layouts/ManageLayout';
import SearchInput from '../components/SearchInput';
import PaginationContainer from '../components/PaginationContainer';
import { user } from '.';
import { PostItem } from '../types';

const PostButton = styled.div`
  float: right;
  display: flex;

  .btn {
    display: none;
    margin-right: 4px;
    font-size: 13px;
    color: #333;
    border: 1px solid #c5cdd7;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
    background-color: #fff;

    :hover {
      border-color: #808080;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
  }
`;

const ListWrapper = styled.div`
  background-color: #fff;
  margin-top: 8px;
  line-height: 180%;
  word-break: break-all; // ?
  height: 386px;
  border: 1px solid #e0e5ee;

  & li {
    padding: 13px 16px 12px;
    font-size: 14px;
    border-bottom: 1px solid #f1f3f6;

    &:hover {
      background-color: #fafbfd;

      ${PostButton} {
        .btn {
          display: block;
        }
      }
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .post_title a {
    margin-right: 5px;
    font-size: 15px;

    :hover {
      text-decoration: underline;
      color: inherit;
      cursor: pointer;
    }
  }

  .post_extra_info {
    & a {
      color: #ff5544;
    }

    & span:not(:first-child) {
      color: #808080;

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

const CloseButton = styled(Button)`
  font-size: 20px;
  background-color: transparent;
  border: 0;
  outline: none;
  box-shadow: none;
`;

const pageSize = 5;
// const DEFAULT_TITLE = '글 관리';

const PostManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(pageSize);

  const [posts, setPosts] = useState<PostItem[]>(user.posts);
  const [title, setTitle] = useState('');
  const [postsCount, setPostsCount] = useState(user.posts.length);

  const onChangePage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setFirstIndex((page - 1) * pageSize);
      setLastIndex(page * pageSize);
    },
    [pageSize]
  );

  const onChangePostList = useCallback(
    (e) => {
      // category를 서버에 보내서 category에 속한 게시글 요청
      // const response = await axios.get(`/category?id=${e.target.dataset.id}`);
      // setPosts(response);
      // setPostsCount(response.length);
      setTitle(e.target.dataset.name);
      setCurrentPage(1);
      setFirstIndex(0);
      setLastIndex(pageSize);

      let newPosts = [...posts];
      newPosts = newPosts.filter((post) => post.Category.name === e.target.dataset.name);
      setPosts(newPosts);
    },
    [pageSize, posts, title]
  );

  const onLoadMainPosts = useCallback(() => {
    setTitle('');
    setPosts(user.posts);
    setPostsCount(user.posts.length);

    setCurrentPage(1);
    setFirstIndex(0);
    setLastIndex(pageSize);
  }, [user, pageSize]);

  const onDeletePost = useCallback(() => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');

    if (confirm) {
      // 게시글 삭제
      alert('삭제 되었습니다.');
      return;
    }
  }, []);

  return (
    <ManageLayout>
      <div style={{ marginTop: -20 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {title ? (
            <>
              <CloseButton onClick={onLoadMainPosts}>
                <CloseCircleOutlined />
              </CloseButton>
              <span style={{ fontSize: '18px' }}>{title} 글</span>
            </>
          ) : (
            <span style={{ fontSize: '18px' }}>글 관리</span>
          )}
          <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>{postsCount}</span>
        </div>
        <SearchInput />
        <ListWrapper>
          <ul>
            {posts?.slice(firstIndex, lastIndex).map(
              (post) =>
                user.id === post.authorId && (
                  <li>
                    <PostInfo>
                      <div>
                        <div className='post_title'>
                          <Link
                            href={{ pathname: `/post/${post.id}`, query: { post: JSON.stringify(post) } }}
                            as={`/post/${post.id}`}
                          >
                            <a>
                              <span>
                                [{post.Category.name}] {post.title}
                              </span>
                            </a>
                          </Link>
                          <PaperClipOutlined />
                        </div>
                        <div className='post_extra_info'>
                          <a onClick={onChangePostList}>
                            <span data-name={post.Category.name} data-id={post.Category.id}>
                              {post.Category.name}
                            </span>
                          </a>
                          <span>{post.author}</span>
                          <span>{post.createdAt}</span>
                        </div>
                      </div>
                      <PostButton>
                        <Link
                          href={{ pathname: '/write', query: { post: JSON.stringify(post) } }}
                          as={`/write/${post.id}`}
                        >
                          <a>
                            <Button className='modify btn'>수정</Button>
                          </a>
                        </Link>
                        <Button className='delete btn' onClick={onDeletePost}>
                          삭제
                        </Button>
                      </PostButton>
                    </PostInfo>
                  </li>
                )
            )}
          </ul>
        </ListWrapper>
      </div>
      <PaginationContainer pageSize={pageSize} current={currentPage} total={posts.length} onChange={onChangePage} />
    </ManageLayout>
  );
};

export default PostManage;
