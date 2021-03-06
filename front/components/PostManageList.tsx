import React, { FC, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

import { user } from '../pages/index';
import { PostItem } from '../types';

const PostButton = styled.div`
  float: right;
  display: flex;

  .btn {
    display: none;
    width: 40px;
    height: 24px;
    margin-right: 4px;
    font-size: 12px;
    color: #333;
    border: 1px solid #c5cdd7;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 8%);
    background-color: #fff;

    :hover {
      border-color: #808080;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
  }

  .subscribe_cancel {
    width: 85px;
    height: 30px;
    font-size: 13px;
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

interface PostManageListProps {
  posts: PostItem[];
  firstIndex: number;
  lastIndex: number;
  onChangePostList: (e: any) => void;
}

const PostManageList: FC<PostManageListProps> = ({ posts, firstIndex, lastIndex, onChangePostList }) => {
  const onDeletePost = useCallback(() => {
    const confirm = window.confirm('????????? ?????????????????????????');

    if (confirm) {
      // ????????? ??????
      alert('?????? ???????????????.');
      return;
    }
  }, []);

  const onCancelSubscribe = () => {
    const confirm = window.confirm('????????? ?????????????????????????');
    if (!confirm) {
      return;
    }

    // ?????? ?????? ??????
    // user.subscribedPost?????? ??????
  };

  return (
    <ListWrapper>
      <ul>
        {posts?.slice(firstIndex, lastIndex).map((post) => (
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
                {post.authorId === user.id ? (
                  <>
                    <Link href={{ pathname: '/write', query: { post: JSON.stringify(post) } }} as={`/write/${post.id}`}>
                      <a>
                        <Button className='modify btn'>??????</Button>
                      </a>
                    </Link>
                    <Button className='delete btn' onClick={onDeletePost}>
                      ??????
                    </Button>
                  </>
                ) : (
                  <Button className='subscribe_cancel btn' onClick={onCancelSubscribe}>
                    ?????? ??????
                  </Button>
                )}
              </PostButton>
            </PostInfo>
          </li>
        ))}
      </ul>
    </ListWrapper>
  );
};

export default PostManageList;
