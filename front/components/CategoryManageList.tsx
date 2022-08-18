import React, { FC, useState, useCallback, ChangeEvent, FormEvent, DragEvent, Dispatch } from 'react';
import { Button, Form } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import useInput from '../hooks/common/input';
import { CategoryItem } from '../types';
import {
  CategoryManageListWrapper,
  EditButton,
  DragIconWrapper,
  ItemWrapper,
  TextArea,
  StyledInput,
  FormButton,
  AddCategoryWrapper,
  TotalCount,
} from '../styles/ts/components/CategoryManageList';

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
                        ({item.posts?.length})
                      </span>
                    </div>
                    <EditButton>
                      <Button className='modify btn' onClick={() => onClickUpdateBtn(item.id, item.name)}>
                        수정
                      </Button>
                      <Button
                        className='delete btn'
                        onClick={() => onClickDeleteBtn(item.id)}
                        disabled={item.posts?.length > 0}
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
            <TotalCount>
              <span style={{ color: '#333' }}>{categories.length}</span> / 12
            </TotalCount>
          </AddCategoryWrapper>
        </div>
      </div>
    </CategoryManageListWrapper>
  );
};

export default CategoryManageList;
