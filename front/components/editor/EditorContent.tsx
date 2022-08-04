import React, { FC, ChangeEvent, KeyboardEvent, useRef, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import TinymceEditor from './tinymce/TinymceEditor';
import useInput from '../../hooks/input';
import { CategoryItem } from '../../types';
import { categories } from '../Category';

const Container = styled.div`
  background-color: #fff;
  position: absolute;
  top: 70px;
  bottom: 66px;
  left: 0;
  right: 0;
  overflow-y: scroll;

  .post_header {
    padding: 0 40px;
  }
`;

const SelectCategory = styled.div`
  width: 860px;
  height: 30px;
  margin: 46px auto 0;
`;

const PostTitle = styled.div`
  width: 860px;
  margin: 18px auto 17px;

  .title_input {
    padding: 0;
    border: 0;
    outline: none;
    background: none;
    font-size: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const TagArea = styled.div`
  width: 860px;
  min-height: 115px;
  margin: 0 auto;
  padding: 0 0 80px;
  box-sizing: border-box;
  font-size: 0;

  .tag {
    display: inline-block;
    position: relative;
    margin: 16px 10px 0 0;
    font-size: 13px;
    vertical-align: top;
    white-space: nowrap;
  }

  .close_icon {
    color: #999;
    font-size: 11px;
    margin-left: 3px;
  }

  .tag_input {
    display: inline-block;
    margin: 16px 26px 0 0;
    font-size: 13px;
    color: #909090;
    vertical-align: top;
  }
`;

interface EditorContentProps {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  content: string;
  onChangeContent: (value: string) => void;
  onChangeThumbnailContent: (value: string) => void;
  tags: string[];
  onAddTag: (value: string) => void;
  onRemoveTag: (index: number) => any;
  category: CategoryItem;
  onChangeCategory: (value: string, option: CategoryItem) => void;
  onGetImageUrl: (files: any) => void;
  loadTempSavePost: boolean;
  setLoadTempSavePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorContent: FC<EditorContentProps> = ({
  title,
  onChangeTitle,
  content,
  onChangeContent,
  onChangeThumbnailContent,
  tags,
  onAddTag,
  onRemoveTag,
  category,
  onChangeCategory,
  onGetImageUrl,
  loadTempSavePost,
  setLoadTempSavePost,
}) => {
  const [tag, onChangeTag, setTag] = useInput('');
  const dropzoneRef = useRef(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!tag || !tag.trim()) {
      return;
    }

    if (e.key === 'Enter') {
      onAddTag(tag);
      setTag('');
    }
  };

  const handleOpenFile = useCallback(() => {
    dropzoneRef.current.open();
  }, [dropzoneRef]);

  return (
    <Container className='container'>
      <div className='post_header'>
        <SelectCategory>
          <Select
            defaultValue={'카테고리'}
            value={category.name || '카테고리'}
            style={{ width: '170px' }}
            onChange={onChangeCategory}
          >
            {categories?.map((category) => (
              <Select.Option key={category.id} className='select_option' id={category.id} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </SelectCategory>
        <PostTitle>
          <Input
            className='title_input'
            value={title}
            onChange={onChangeTitle}
            placeholder='제목을 입력하세요'
            autoFocus
          />
        </PostTitle>
      </div>
      <Dropzone ref={dropzoneRef} accept={{ 'image/*': ['.gif', '.jpg', 'jpeg', '.png'] }} onDrop={onGetImageUrl}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className='editor_inner'
            {...getRootProps({
              onClick: (e) => e.stopPropagation(),
            })}
          >
            <TinymceEditor
              content={content}
              onChangeContent={onChangeContent}
              onChangeThumbnailContent={onChangeThumbnailContent}
              onOpenFile={handleOpenFile}
              onGetImageUrl={onGetImageUrl}
              loadTempSavePost={loadTempSavePost}
              setLoadTempSavePost={setLoadTempSavePost}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <TagArea>
        {tags?.map((tag, idx) => (
          <div key={idx} style={{ display: 'inline-block' }}>
            <span className='tag'>
              #{tag}
              <CloseOutlined className='close_icon' onClick={() => onRemoveTag(idx)} />
            </span>
          </div>
        ))}
        <span className='tag_input'>
          <span>#</span>
          <div style={{ display: 'inline-block' }}>
            <Input
              style={{ padding: 0, border: 0, boxSizing: 'content-box' }}
              placeholder='태그입력'
              value={tag}
              onChange={onChangeTag}
              onKeyPress={handleKeyPress}
            />
          </div>
        </span>
      </TagArea>
    </Container>
  );
};

export default EditorContent;
