import React, { FormEvent, useCallback, useState, useRef, DragEvent } from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import ManageLayout from '../components/layouts/ManageLayout';
import { CategoryItem } from '../types';
import useInput from '../hooks/input';

const ManageCategoryWrapper = styled.div`
  font-size: 14px;
  background: #fff;
  border-radius: 1px;
  border: 1px solid #e0e5ee;
  padding: 25px 29px 0;
  margin-top: 8px;

  .set_order {
    margin: 21px 0 30px;
    padding: 8px;
    border-radius: 1px;
    background: #e7edf3;

    .wrap_order {
      position: relative;
    }
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  .desc_text {
    line-height: 60%;

    .info {
      font-size: 13px;
      color: #808080;
    }
  }
`;

const DragIconWrapper = styled.div`
  margin: 6px 8px 0 -10px;
  padding: 10px;
  color: #bbb;

  :hover {
    cursor: move;
  }
`;

const TextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .category_name {
    width: 320px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    & span:first-child {
      font-size: 17px;
    }
  }
`;

const EditButton = styled.div`
  display: flex;

  .btn {
    display: none;
    padding: 0;
    font-size: 12px;
    width: 40px;
    height: 26px;
    color: #333;

    :hover {
      border-color: #808080;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
  }

  .modify {
    margin-right: 5px;
  }
`;

const ItemWrapper = styled.div`
  padding: 0 19px;
  height: 52px;
  margin-bottom: -1px;
  border: 1px solid #e0e5ee;
  font-size: 15px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid #808080;

    ${EditButton} {
      .btn {
        display: block;
      }
    }

    ${DragIconWrapper} {
      color: #808080;
    }
  }
  /* 
  &.drag_element {
    background-color: #e7edf3;
    border: 1px solid #89a7c4;
  } */

  &.drop_zone {
    border-bottom: 3px solid #ff0000;
  }
`;

const StyledInput = styled(Input)`
  width: 330px;
  height: 40px;
  font-size: 17px;

  .ant-input:focus {
    border-color: none;
    box-shadow: none;
  }
`;

const FormButton = styled.div`
  display: flex;
  align-items: center;

  .btn {
    padding: 0;
    width: 80px;
    height: 32px;
  }

  .cancel {
    margin-right: 5px;
    color: #333;
    background: #fff;
    border: 1px solid #c5cdd7;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #808080;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
  }

  .submit:enabled {
    color: #fff;
    background: #333;
    border: 1px solid #c5cdd7;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);
  }
`;

const AddCategoryWrapper = styled.div`
  height: 50px;
  margin-top: 8px;
  padding: 3px 20px;
  line-height: 48px;
  font-size: 16px;
  border: 1px dotted #acb3bf;

  &:hover {
    border: 1px dotted #888;
    cursor: pointer;
  }

  .add_category_text {
    margin-left: 14px;
  }
`;

const CountTotal = styled.div`
  float: right;
  color: #959595;
  font-size: 13px;
  font-family: 'Avenir Next Regular', AppleSDGothicNeo, '돋움', dotum, sans-serif;
`;

const categories: CategoryItem[] = [
  {
    id: '1',
    name: 'algorithm',
    posts: [
      {
        id: '10',
        title: '입국심사',
        content: '...',
        Comments: [
          {
            content: '좋은 글 보고 가요~',
            datetime: '2022.06.23',
            User: {
              id: '25',
              name: '토마스',
              email: 'tomas@naver.com',
            },
          },
          {
            content: '샌디님 오늘은 뭐하셨나요??',
            datetime: '2022.06.25',
            User: {
              id: '80',
              name: '민트',
              email: 'mint@naver.com',
            },
          },
        ],
        author: 'sandy',
        Category: { id: '1', name: 'algorithm' },
        authorId: '77',
        createdAt: '2022.06.12',
      },
      {
        id: '9',
        title: '거리두기 확인하기',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.06.11',
      },
      {
        id: '8',
        title: '점프와 순간 이동',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'tomas',
        authorId: '25',
        createdAt: '2022.05.28',
      },
      {
        id: '7',
        title: '끝말잇기',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'jenny',
        authorId: '12',
        createdAt: '2022.05.16',
      },
      {
        id: '2',
        title: '전화번호 목록',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.04.27',
      },
      {
        id: '1',
        title: '프린터',
        content: '...',
        Comments: [],
        Category: { id: '1', name: 'algorithm' },
        author: 'happy',
        authorId: '7',
        createdAt: '2022.04.03',
      },
    ],
  },
  {
    id: '2',
    name: 'javascript',
    posts: [
      {
        id: '6',
        title: '자바스크립트 알아보기',
        content: '...',
        Comments: [],
        Category: { id: '2', name: 'javascript' },
        author: 'tomas',
        authorId: '25',
        createdAt: '2022.04.30',
      },
    ],
  },
  {
    id: '3',
    name: 'typescript',
    posts: [
      {
        id: '5',
        title: '타입스크립트 시작하기',
        content: '...',
        Comments: [],
        Category: { id: '3', name: 'typescript' },
        author: 'elli',
        authorId: '11',
        createdAt: '2022.04.29',
      },
    ],
  },
  {
    id: '4',
    name: 'react',
    posts: [
      {
        id: '4',
        title: '리액트란?',
        content: '...',
        Comments: [],
        Category: { id: '4', name: 'react' },
        author: 'sandy',
        authorId: '77',
        createdAt: '2022.04.24',
      },
      {
        id: '3',
        title: '리액트 프레임워크',
        content: '...',
        Comments: [],
        Category: { id: '4', name: 'react' },
        author: 'mint',
        authorId: '80',
        createdAt: '2022.04.20',
      },
    ],
  },
];

const ManageCategory = () => {
  const [category, onChangeCategory, setCategory] = useInput('');
  const [showInput, setShowInput] = useState(false);

  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);
  const [newCategories, setNewCategories] = useState<CategoryItem[]>(categories);

  const onCancelAddCategory = useCallback(() => {
    setShowInput(false);
    setCategory('');
  }, []);

  const onAddCategory = useCallback((e: FormEvent<HTMLButtonElement>) => {
    // categories에 새로운 카테고리 추가

    setShowInput(false);
    setCategory('');
  }, []);

  const onClickAddCategoryField = useCallback(() => {
    setShowInput(true);
  }, []);

  // Drag & Drop
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setDraggedItemIdx(Number(e.currentTarget.dataset.index));
    e.currentTarget.classList.add('drag_element');
  };

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag_element');
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    setTargetItemIdx(Number(e.currentTarget.dataset.index));
    e.currentTarget.classList.add('drop_zone');
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drop_zone');
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drop_zone');

    let _categories = [...newCategories];
    const draggedItemContent = _categories.splice(draggedItemIdx, 1)[0];
    _categories.splice(targetItemIdx, 0, draggedItemContent);

    setNewCategories(_categories);
  };

  return (
    <ManageLayout>
      <span style={{ fontSize: '18px' }}>카테고리 관리</span>
      <ManageCategoryWrapper>
        <Description>
          <div className='desc_text'>
            <p className='title'>카테고리 순서를 변경하고 새로운 카테고리를 추가할 수 있습니다.</p>
            <p className='info'>드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.</p>
          </div>
          <CountTotal>
            <span style={{ color: '#333' }}>{newCategories.length}</span> / 12
          </CountTotal>
        </Description>

        <div className='set_order'>
          <div className='wrap_order'>
            <div className='list_order'>
              {newCategories.map((item, idx) => (
                <ItemWrapper
                  key={item.id}
                  data-index={idx}
                  draggable
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  <DragIconWrapper>
                    <MenuOutlined />
                  </DragIconWrapper>
                  <TextArea>
                    <div className='category_name'>
                      <span>{item.name}</span>
                      <span style={{ fontSize: '13px', marginLeft: '4px', color: '#808080' }}>
                        ({item.posts.length})
                      </span>
                    </div>
                    <EditButton>
                      <Button className='modify btn'>수정</Button>
                      <Button className='delete btn'>삭제</Button>
                    </EditButton>
                  </TextArea>
                </ItemWrapper>
              ))}
              {showInput && (
                <ItemWrapper style={{ background: '#fbfbfb' }}>
                  <Form
                    onFinish={onAddCategory}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <StyledInput type='text' value={category} onChange={onChangeCategory} autoFocus />
                    <FormButton>
                      <Button className='cancel btn' onClick={onCancelAddCategory}>
                        취소
                      </Button>
                      <Button className='submit btn' htmlType='submit' disabled={!category || !category.trim()}>
                        확인
                      </Button>
                    </FormButton>
                  </Form>
                </ItemWrapper>
              )}
            </div>
            <AddCategoryWrapper onClick={onClickAddCategoryField}>
              <PlusOutlined />
              <span className='add_category_text'>카테고리 추가</span>
              <CountTotal>
                <span style={{ color: '#333' }}>{newCategories.length}</span> / 12
              </CountTotal>
            </AddCategoryWrapper>
          </div>
        </div>
      </ManageCategoryWrapper>
    </ManageLayout>
  );
};

export default ManageCategory;
