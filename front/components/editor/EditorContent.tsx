import React, { FC, ChangeEvent, KeyboardEvent, useRef, useCallback, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import TinymceEditor from './TinymceEditor';
import useInput from '../../hooks/common/input';
import { CategoryItem, TagItem } from '../../types';
import { useGetCategories } from '../../hooks/query/categories';
import * as S from '../../styles/ts/components/editor/EditorContent';

interface EditorContentProps {
  title: string;
  titleRef: React.MutableRefObject<any>;
  isTitleEmpty: boolean;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  htmlContent: string;
  onChangeContent: (HTMLvalue: string, textValue: string) => void;
  tags: TagItem[];
  onAddTag: (value: string) => void;
  onRemoveTag: (index: number) => any;
  category: CategoryItem;
  onChangeCategory: (value: string, option: CategoryItem) => void;
  onGetImageUrl: (files: any) => void;
  loadTempPost: boolean;
  setLoadTempPost: React.Dispatch<React.SetStateAction<boolean>>;
  loadContent: boolean;
  setLoadContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorContent: FC<EditorContentProps> = ({
  title,
  titleRef,
  isTitleEmpty,
  onChangeTitle,
  htmlContent,
  onChangeContent,
  tags,
  onAddTag,
  onRemoveTag,
  category,
  onChangeCategory,
  onGetImageUrl,
  loadTempPost,
  setLoadTempPost,
  loadContent,
  setLoadContent,
}) => {
  const { data: categories } = useGetCategories();

  const [tag, onChangeTag, setTag] = useInput('');
  const dropzoneRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

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
    <S.Container className='container'>
      <div className='post_header'>
        <S.SelectCategory>
          <Select
            defaultValue={'카테고리'}
            value={category?.name || '카테고리'}
            style={{ width: '170px' }}
            onChange={onChangeCategory}
          >
            {categories?.map((category) => (
              <Select.Option key={category.id} className='select_option' id={category.id} value={category.name}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </S.SelectCategory>
        <S.PostTitle>
          <Input
            ref={titleRef}
            className={classNames('title', { empty: isTitleEmpty })}
            value={title}
            onChange={onChangeTitle}
            placeholder='제목을 입력하세요'
            autoFocus
          />
        </S.PostTitle>
      </div>
      <Dropzone ref={dropzoneRef} accept={{ 'image/*': ['.gif', '.jpg', '.jpeg', '.png'] }} onDrop={onGetImageUrl}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className='editor_inner'
            {...getRootProps({
              onClick: (e) => e.stopPropagation(),
            })}
          >
            <TinymceEditor
              htmlContent={htmlContent}
              onChangeContent={onChangeContent}
              onOpenFile={handleOpenFile}
              onGetImageUrl={onGetImageUrl}
              loadTempPost={loadTempPost}
              setLoadTempPost={setLoadTempPost}
              loadContent={loadContent}
              setLoadContent={setLoadContent}
            />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <S.TagArea>
        {tags?.map((tag, idx) => (
          <div key={idx} style={{ display: 'inline-block' }}>
            <span className='tag'>
              #{tag.name}
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
      </S.TagArea>
    </S.Container>
  );
};

export default EditorContent;
