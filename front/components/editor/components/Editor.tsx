import React, { FC, ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import tinymce from 'tinymce';

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

  const handleUploadImage = (imageUrl: string) => {
    const editor = tinymce.activeEditor;
    const dom = editor.dom;

    editor.execCommand('mceInsertContent', false, '<img id="new_image" src="' + imageUrl + '" />');

    let img = dom.select('#new_image');
    dom.setAttrib(img, 'id', 'new_image');
    dom.bind(img, 'load', (e) => {
      editor.nodeChanged();
      dom.unbind(img, 'load');
    });
  };

  const handleGetImageUrl = (files: Array<File>) => {
    console.log('files', files);

    [].forEach.call(files, (file: File) => {
      const reader = new FileReader();

      // 읽기 동작이 성공적으로 완료되면 실행
      reader.onload = (e) => {
        console.log(e.target.result);
        handleUploadImage(e.target.result as string);
      };

      reader.readAsDataURL(file);
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
        onGetImageUrl={handleGetImageUrl}
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
