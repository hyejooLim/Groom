import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import { Button } from 'antd';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import * as ContentMode from '../constants/ContentMode';
import { ContentModeType, PostItem, CategoryItem } from '../../../types';

const history = createBrowserHistory();

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
    }
  }

  .btn_wrapper .count:before {
    content: '';
    width: 1px;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.09);
    display: inline-block;
    margin: 0 9px -1px 9px;
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
  onFinish: () => void;
}

const Editor: FC<EditorProps> = ({ post, mode, onFinish }) => {
  const makePostState = () => {
    if (post && mode === ContentMode.EDIT) {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags,
        Category: post.Category,
        author: post.author,
        authorId: post.authorId,
        createdAt: post.createdAt,
      };
    } else {
      return {
        id: '',
        title: '',
        content: '',
        Category: { id: '', name: '' },
        tags: [],
        author: '',
        authorId: '',
        createdAt: '',
      };
    }
  };

  const [postData, setPostData] = useState(makePostState());
  const [tempCount, setTempCount] = useState(0);

  useEffect(() => {
    const unlisten = history.listen(({ action }) => {
      if (action === 'POP') {
        const confirm = window.confirm('사이트에서 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
        if (confirm) {
          console.log('확인');
          onFinish();
          return;
        }

        console.log('취소');
        // 현재 화면 유지해야됨
      }
    });

    return () => {
      unlisten();
    };
  }, [history, onFinish]);

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

  const handleAddTag = (value: string) => {
    setPostData({
      ...postData,
      tags: [...postData.tags, value],
    });
  };

  const handleRemoveTag = (index: number) => {
    let newTags = [...postData.tags];
    newTags = newTags.filter((tag) => newTags.indexOf(tag) !== index);

    setPostData({
      ...postData,
      tags: newTags,
    });
  };

  const handleChangeCategory = (value: string, option: CategoryItem) => {
    setPostData({
      ...postData,
      Category: { id: option.id, name: value },
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
        tags={postData.tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        category={postData.Category}
        onChangeCategory={handleChangeCategory}
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
