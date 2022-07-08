import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { Button, Input, Select } from 'antd';

import TinymceEditor from './tinymce/TinymceEditor';
import { categories } from '../Category';
import { CategoryItem } from '../../types';

const Container = styled.div`
  background-color: #fff;
  width: 100%;

  .post_header {
    padding: 0 40px;
  }
`;

const SelectCategory = styled.div`
  width: 860px;
  margin: 14px auto 0;

  padding-top: 80px;
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

  .tag_input_wrapper {
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
}

const EditorContent: FC<EditorContentProps> = ({ title, onChangeTitle, content, onChangeContent }) => {
  const onChangeCategory = (value: string, option: CategoryItem) => {
    console.log(value);
    console.log(option.id);
  };

  return (
    <Container>
      <div className='post_header'>
        <SelectCategory>
          <Select defaultValue='카테고리' style={{ width: '170px' }} onChange={onChangeCategory}>
            {categories?.map((category) => (
              <Select.Option className='select_option' id={category.id} value={category.name}>
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
            placeholder='제목을 입력하세요.'
            autoFocus
          />
        </PostTitle>
      </div>
      <TinymceEditor content={content} onChangeContent={onChangeContent} />
      <TagArea>
        <span className='tag_input_wrapper'>
          <span>#</span>
          <div style={{ display: 'inline-block' }}>
            <Input
              className='tag_input'
              style={{ padding: 0, boxSizing: 'content-box', border: 0 }}
              placeholder='태그입력'
            />
          </div>
        </span>
      </TagArea>
    </Container>
  );
};

export default EditorContent;
