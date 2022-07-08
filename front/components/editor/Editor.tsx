import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import { ContentModeType, PostItem } from '../../types';

// constant
const ContentMode = {
  EDIT: 'EDIT',
  NEW: 'NEW',
};

const ContentAside = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 66px;
  background-color: #f5f5f5;
  min-width: 944px;
  text-align: right;

  .btn_wrapper {
    float: right;
    padding: 13px 54px 0 0;
    display: flex;

    .btn {
      height: 40px;
      border: 1px solid #d0d0d0;
      border-radius: 20px;
      margin: 0 4px;
      transition: border-color 0.2s, color 0.2s, background-color 0.2s;
    }

    .temp_save {
      width: 122px;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        padding: 0 7px 0 14px;
      }
    }
  }

  .btn_wrapper .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.09);
    display: inline-block;
    margin: 0 9px -1px 0;
  }
`;

const PublishButton = styled(Button)`
  color: #fff;
  background-color: #000;
  border: 1px solid #000;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not([disabled]):focus,
  &:not([disabled]):hover {
    border-color: #f54;
    color: #fff;
    background-color: #f54;
  }
`;

interface EditorProps {
  post?: PostItem;
  mode: ContentModeType;
}

const Editor: FC<EditorProps> = ({ post, mode }) => {
  const makePostState = () => {
    if (post && mode === ContentMode.EDIT) {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        Category: post.Category,
        author: post.author,
        authorId: post.authorId,
        createdAt: post.createdAt,
        // tags: post.tags,
      };
    } else {
      return {
        id: '',
        title: '',
        content: '',
        Category: {},
        author: '',
        authorId: '',
        createdAt: '',
      };
    }
  };

  const [postData, setPostData] = useState(makePostState());
  const [tempCount, setTempCount] = useState(0);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      title: e.target.value,
    });
  };

  const handleChangeContent = (value: string) => {
    setPostData({
      ...postData,
      content: value,
    });
  };

  return (
    <>
      <EditorToolbar />
      <EditorContent
        title={postData.title}
        onChangeTitle={handleChangeTitle}
        content={postData.content}
        onChangeContent={handleChangeContent}
      />
      <ContentAside>
        <div className='btn_wrapper'>
          <span className='temp_save btn'>
            <a className='text'>임시저장</a>
            <a aria-expanded='false' aria-label={`임시저장 개수 ${tempCount}개`} className='count'>
              {tempCount}
            </a>
          </span>
          <PublishButton className='publish btn'>완료</PublishButton>
        </div>
      </ContentAside>
    </>
  );
};

export default Editor;
