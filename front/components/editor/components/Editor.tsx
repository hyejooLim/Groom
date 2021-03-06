import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import EditorToolbar from './EditorToobar';
import EditorContent from './EditorContent';
import { ContentModeType, PostItem, CategoryItem } from '../../../types';
import * as ContentMode from '../constants/ContentMode';

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
}

const Editor: FC<EditorProps> = ({ post, mode }) => {
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
  const [imageUrlList, setImageUrlList] = useState<(string | ArrayBuffer)[]>([]);

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

  const handleGetImageUrl = (files) => {
    console.log('files', files);

    let _imageUrlList = [];

    [].forEach.call(files, (file) => {
      const reader = new FileReader();
      // ?????? ????????? ??????????????? ???????????? ??????
      reader.onload = (e) => {
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
      _imageUrlList.push(reader.result);
    });

    setImageUrlList(_imageUrlList);
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
        onGetImageUrl={handleGetImageUrl}
        imageUrlList={imageUrlList}
      />
      <ContentAside>
        <div className='btn_wrapper'>
          <span className='temp_save btn'>
            <a className='text'>????????????</a>
            <a aria-expanded='false' aria-label={`???????????? ?????? ${tempCount}???`} className='count'>
              {tempCount}
            </a>
          </span>
          <PublishButton className='publish btn'>??????</PublishButton>
        </div>
      </ContentAside>
    </>
  );
};

export default Editor;
