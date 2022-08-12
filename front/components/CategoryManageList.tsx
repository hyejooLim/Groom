import React, { FC, useState, useCallback, ChangeEvent, FormEvent, DragEvent, Dispatch } from 'react';
import styled from 'styled-components';
import { Input, Button, Form } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import useInput from '../hooks/input';
import { CategoryItem } from '../types';

const CategoryManageListWrapper = styled.div`
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

const EditButton = styled.div`
  display: flex;

  .btn {
    display: none;
    font-size: 12px;
    width: 40px;
    height: 26px;
    border: 1px solid #c5cdd7;
    background-color: #fff;
  }

  .btn:enabled {
    color: #333;

    :hover {
      border-color: #a4adba;
      box-shadow: 0px 2px 3px 0px rgb(0 0 0 / 12%);
    }
  }

  .modify {
    margin-right: 5px;
  }

  .delete:not(:enabled) {
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;

    :hover {
      background-color: inherit;
      border-color: #e0e5ee;
      color: #959595;
      box-shadow: none;
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

const ItemWrapper = styled.div`
  padding: 0 19px;
  height: 52px;
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

  &.drop_zone {
    border-bottom: 3px solid #ff0000;
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
    width: 80px;
    height: 32px;
    font-size: 13px;
    border: 1px solid #c5cdd7;
  }

  .cancel {
    margin-right: 5px;
    color: #333;
    background: #fff;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #a5adba;
      box-shadow: 0 2px 3px rgb(0 0 0 / 12%);
    }
  }

  .submit:not(:enabled) {
    background: #fff;
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;
  }

  .submit:enabled {
    color: #fff;
    background: #333;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      background: #505050;
      box-shadow: 0 2px 5px rgb(0 0 0 / 12%);
    }
  }
`;

const AddCategoryWrapper = styled.div`
  height: 50px;
  margin-top: 8px;
  padding: 3px 20px;
  line-height: 48px;
  font-size: 16px;
  border: 1px dotted #acb3bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border: 1px dotted #888;
    cursor: pointer;
  }

  .add_category_text {
    margin-left: 14px;
  }
`;

export const CountTotal = styled.div`
  float: right;
  color: #959595;
  font-size: 12px;
`;

interface CategoryManageListProps {
  categories: CategoryItem[];
  setCategories: Dispatch<React.SetStateAction<CategoryItem[]>>;
}

const CategoryManageList: FC<CategoryManageListProps> = ({ categories, setCategories }) => {
  const [category, onChangeCategory, setCategory] = useInput('');
  const [showInput, setShowInput] = useState(false);
  const [editMode, setEditMode] = useState<CategoryItem>({
    id: null,
    name: '',
  });

  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);

  const onClickUpdateBtn = useCallback((categoryId: number, categoryName: string) => {
    setEditMode({ id: categoryId, name: categoryName });
  }, []);

  const onChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditMode({ ...editMode, name: e.target.value });
    },
    [editMode]
  );

  const newList = categories.reduce((acc: CategoryItem[], cur: CategoryItem) => {
    let newObj = cur;

    if (cur.id === editMode.id) {
      newObj = { ...newObj, name: editMode.name };
    }

    acc.push(newObj);
    return acc;
  }, []);

  const onUpdateCategoryName = useCallback(() => {
    setCategories(newList);
    setEditMode({ id: null, name: '' });
  }, [newList]);

  const onCancelUpdateCategoryName = useCallback(() => {
    setEditMode({ id: null, name: '' });
  }, []);

  const onClickDeleteBtn = useCallback(
    (categoryId: number) => {
      const _categories = [...categories];
      setCategories(_categories.filter((item) => item.id !== categoryId));
    },
    [categories]
  );

  const onClickAddCategoryField = useCallback(() => {
    setShowInput(true);
  }, []);

  const onCancelAddCategory = useCallback(() => {
    setShowInput(false);
    setCategory('');
  }, []);

  const onAddCategory = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      setCategories([
        ...categories,
        {
          id: Number(categories[categories.length - 1].id) + 1,
          name: category,
          posts: [],
        },
      ]);

      setShowInput(false);
      setCategory('');
    },
    [category]
  );

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

    let _categories = [...categories];
    const draggedItemContent = _categories.splice(draggedItemIdx, 1)[0];
    _categories.splice(targetItemIdx, 0, draggedItemContent);

    setCategories(_categories);
  };

  return (
    <CategoryManageListWrapper>
      <div className='set_order'>
        <div className='wrap_order'>
          <div className='list_order'>
            {categories.map((item, idx) =>
              item.id === editMode.id ? (
                <ItemWrapper style={{ background: '#fbfbfb' }}>
                  <Form
                    onFinish={onUpdateCategoryName}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <StyledInput type='text' value={editMode.name} onChange={onChangeCategoryName} autoFocus />
                    <FormButton>
                      <Button className='cancel btn' onClick={onCancelUpdateCategoryName}>
                        취소
                      </Button>
                      <Button
                        className='submit btn'
                        htmlType='submit'
                        disabled={!editMode.name || !editMode.name.trim() || item.name === editMode.name.trim()}
                      >
                        확인
                      </Button>
                    </FormButton>
                  </Form>
                </ItemWrapper>
              ) : (
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
                      <Button className='modify btn' onClick={() => onClickUpdateBtn(item.id, item.name)}>
                        수정
                      </Button>
                      <Button
                        className='delete btn'
                        onClick={() => onClickDeleteBtn(item.id)}
                        disabled={item.posts.length > 0}
                      >
                        삭제
                      </Button>
                    </EditButton>
                  </TextArea>
                </ItemWrapper>
              )
            )}

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
            <div>
              <PlusOutlined />
              <span className='add_category_text'>카테고리 추가</span>
            </div>
            <CountTotal>
              <span style={{ color: '#333' }}>{categories.length}</span> / 12
            </CountTotal>
          </AddCategoryWrapper>
        </div>
      </div>
    </CategoryManageListWrapper>
  );
};

export default CategoryManageList;
