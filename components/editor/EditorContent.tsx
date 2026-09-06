import React, { FC, ChangeEvent, KeyboardEvent, useRef, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import { TextField, Select, MenuItem, FormControl } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import classNames from 'classnames';

import TinymceEditor from './TinymceEditor';
import useInput from '../../hooks/common/input';
import { CategoryItem, TagItem } from '../../types';
import { useGetCategories } from '../../hooks/query/categories';

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
  onChangeCategory: (e: ChangeEvent<HTMLInputElement>) => void;
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <div className='absolute bottom-[66px] left-0 right-0 top-[75px] overflow-y-scroll bg-white'>
      <div className='px-10'>
        <div className='mx-auto mt-[46px] h-[30px] w-[860px]'>
          <FormControl fullWidth size='small'>
            <Select
              value={category?.name || '카테고리'}
              onChange={onChangeCategory}
              className='w-[170px]'
              sx={{
                height: '38px',
                fontSize: '14px',
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return <span className='text-gray-400'>카테고리</span>;
                }
                return selected;
              }}
            >
              <MenuItem value='카테고리' disabled>
                카테고리
              </MenuItem>
              {categories?.map((cat) => (
                <MenuItem key={cat.id} id={cat.id} value={cat.name} className='select_option'>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='mx-auto my-4 w-[860px]'>
          <TextField
            inputRef={titleRef}
            variant='standard'
            fullWidth
            value={title}
            onChange={onChangeTitle}
            placeholder='제목을 입력하세요'
            autoFocus
            InputProps={{
              disableUnderline: true,
            }}
            className={classNames('title', { empty: isTitleEmpty })}
            sx={{
              '& .MuiInputBase-root': {
                padding: 0,
                fontSize: '30px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                paddingBottom: '20px',
              },
              '& .Mui-focused': {
                outline: 'none',
              },
              ...(isTitleEmpty && {
                '& input::placeholder': {
                  color: '#f75037',
                  opacity: 1,
                },
              }),
            }}
          />
        </div>
      </div>
      <Dropzone ref={dropzoneRef} accept={{ 'image/*': ['.gif', '.jpg', '.jpeg', '.png'] }} onDrop={onGetImageUrl}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className='editor_inner focus-visible:outline-none'
            {...getRootProps({
              onClick: (e) => e.stopPropagation(),
            })}
            tabIndex={1}
          >
            <TinymceEditor
              titleRef={titleRef}
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
      <div className='mx-auto min-h-[115px] w-[860px] pb-20'>
        {tags?.map((item, idx) => (
          <div key={idx} className='inline-block'>
            <span className='relative my-4 mr-2 mt-4 inline-block whitespace-nowrap text-sm align-top'>
              #{item.name}
              <CloseOutlinedIcon className='ml-1 text-grey cursor-pointer' onClick={() => onRemoveTag(idx)} />
            </span>
          </div>
        ))}
        <span className='my-4 mr-6 mt-4 inline-block text-sm text-[#909090] align-top'>
          <span>#</span>
          <div className='inline-block'>
            <TextField
              variant='standard'
              placeholder='태그입력'
              value={tag}
              onChange={onChangeTag}
              onKeyDown={handleKeyDown}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                '& .MuiInputBase-input': {
                  padding: 0,
                },
              }}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default EditorContent;
