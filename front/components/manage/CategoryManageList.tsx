import React, { FC, useState, useCallback, useEffect, ChangeEvent, FormEvent, DragEvent } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Form } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import useInput from '../../hooks/common/input';
import { categoriesState } from '../../recoil/categories';
import { CategoryItem, CategoryJson } from '../../types';
import {
  changeProperty,
  changePriorityWhenDrop,
  changePriorityWhenDropExcludeNewItem,
  changePriorityWhenDelete,
  changePriorityWhenDeleteExcludeNewItem,
} from '../../lib/newList';
import * as S from '../../styles/ts/components/CategoryManageList';

interface CategoryManageListProps {
  categoryJson: CategoryJson;
  setCategoryJson: React.Dispatch<React.SetStateAction<CategoryJson>>;
}

const CategoryManageList: FC<CategoryManageListProps> = ({ categoryJson, setCategoryJson }) => {
  const [category, onChangeCategory, setCategory] = useInput('');
  const [showInput, setShowInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryItem>({
    id: null,
    name: '',
    priority: null,
  });

  const [categories, setCategories] = useRecoilState(categoriesState);

  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);

  // delete
  useEffect(() => {
    console.log(categoryJson);
  }, [categoryJson]);

  const onChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentCategory({ ...currentCategory, name: e.target.value });
    },
    [currentCategory]
  );

  const onClickUpdateButton = useCallback((categoryId: number, categoryName: string, idx: number) => {
    setCurrentCategory({ id: categoryId, name: categoryName, priority: idx });
  }, []);

  const onUpdateCategory = useCallback(() => {
    setCategories(changeProperty({ array: categories, state: currentCategory }));

    if (currentCategory.id < 0) {
      setCategoryJson((prevState) => {
        return {
          ...prevState,
          append: changeProperty({ array: categoryJson.append, state: currentCategory }),
        };
      });
    } else {
      setCategoryJson((prevState) => {
        return {
          ...prevState,
          update: categoryJson.update.find((item) => item.id === currentCategory.id)
            ? changeProperty({ array: categoryJson.update, state: currentCategory })
            : [
                ...prevState.update,
                { id: currentCategory.id, name: currentCategory.name, priority: currentCategory.priority },
              ],
        };
      });
    }
    setCurrentCategory({ id: null, name: '', priority: null });
  }, [currentCategory]);

  const onCancelUpdateCategoryName = useCallback(() => {
    setCurrentCategory({ id: null, name: '', priority: null });
  }, []);

  const onDeleteCategory = useCallback(
    (categoryId: number) => {
      const _categories = [...categories];
      setCategories(_categories.filter((item) => item.id !== categoryId));

      const deletedItemIdx = _categories.findIndex((item) => item.id === categoryId);

      if (categoryId < 0) {
        const _newAppendList = [...categoryJson.append];
        const newAppendList = _newAppendList.filter((item) => item.id !== categoryId);

        setCategoryJson((prevState) => {
          return {
            ...prevState,
            append: changePriorityWhenDelete({ array: newAppendList, state: { deletedItemIdx } }),
          };
        });
      } else {
        setCategoryJson((prevState) => {
          const _newUpdaeList = [...categoryJson.update];
          const newUpdaeList = _newUpdaeList.filter((item) => item.id !== categoryId);

          return {
            ...prevState,
            update: changePriorityWhenDeleteExcludeNewItem({
              array: { main: categories, update: newUpdaeList },
              state: { deletedItemIdx },
            }),
            delete: [
              ...prevState.delete,
              {
                id: categoryId,
              },
            ],
          };
        });
      }
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
      const lastCategoryId = categories[categories.length - 1]?.id;

      if (categories.length === 100) {
        alert('최대 100개의 카테고리를 추가할 수 있습니다.');
        return;
      }

      setCategories([
        ...categories,
        {
          id: lastCategoryId < 0 ? lastCategoryId - 1 : -1,
          name: category,
          priority: categories.length,
        },
      ]);

      setCategoryJson((prevState) => {
        return {
          ...prevState,
          append: [
            ...prevState.append,
            {
              id: lastCategoryId < 0 ? lastCategoryId - 1 : -1,
              name: category,
              priority: categories.length,
            },
          ],
        };
      });

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

    setCategoryJson((prevState) => {
      return {
        ...prevState,
        append: changePriorityWhenDrop({ array: categoryJson.append, state: { draggedItemIdx, targetItemIdx } }),
        update: changePriorityWhenDropExcludeNewItem({
          array: { main: categories, update: categoryJson.update },
          state: { draggedItemIdx, targetItemIdx },
        }),
      };
    });
  };

  return (
    <S.CategoryManageListWrapper>
      <div className='set_order'>
        <div className='wrap_order'>
          <div className='list_order'>
            {categories &&
              categories.map((item, idx) =>
                item.id === currentCategory.id ? (
                  <S.ItemWrapper key={item.id} style={{ background: '#fbfbfb' }}>
                    <Form
                      onFinish={onUpdateCategory}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <S.StyledInput
                        type='text'
                        value={currentCategory.name}
                        onChange={onChangeCategoryName}
                        autoFocus
                      />
                      <S.FormButton>
                        <Button className='cancel btn' onClick={onCancelUpdateCategoryName}>
                          취소
                        </Button>
                        <Button
                          className='submit btn'
                          htmlType='submit'
                          disabled={
                            !currentCategory.name ||
                            !currentCategory.name.trim() ||
                            item.name === currentCategory.name.trim()
                          }
                        >
                          확인
                        </Button>
                      </S.FormButton>
                    </Form>
                  </S.ItemWrapper>
                ) : (
                  <S.ItemWrapper
                    key={item.id}
                    data-key={item.id}
                    data-index={idx}
                    draggable
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                  >
                    <S.DragIconWrapper>
                      <MenuOutlined />
                    </S.DragIconWrapper>
                    <S.TextArea>
                      <div className='category_name'>
                        <span>{item.name}</span>
                        <span style={{ fontSize: '13px', marginLeft: '4px', color: '#808080' }}>
                          ({item.posts?.length || 0})
                        </span>
                      </div>
                      <S.EditButton>
                        <Button className='modify btn' onClick={() => onClickUpdateButton(item.id, item.name, idx)}>
                          수정
                        </Button>
                        <Button
                          className='delete btn'
                          onClick={() => onDeleteCategory(item.id)}
                          disabled={item.posts?.length > 0}
                        >
                          삭제
                        </Button>
                      </S.EditButton>
                    </S.TextArea>
                  </S.ItemWrapper>
                )
              )}
            {showInput && (
              <S.ItemWrapper style={{ background: '#fbfbfb' }}>
                <Form
                  onFinish={onAddCategory}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <S.StyledInput type='text' value={category} onChange={onChangeCategory} autoFocus />
                  <S.FormButton>
                    <Button className='cancel btn' onClick={onCancelAddCategory}>
                      취소
                    </Button>
                    <Button className='submit btn' htmlType='submit' disabled={!category || !category.trim()}>
                      확인
                    </Button>
                  </S.FormButton>
                </Form>
              </S.ItemWrapper>
            )}
          </div>
          <S.AddCategoryWrapper onClick={onClickAddCategoryField}>
            <div>
              <PlusOutlined />
              <span className='add_category_text'>카테고리 추가</span>
            </div>
            <S.TotalCount>
              <span style={{ color: '#333' }}>{categories?.length}</span> / 100
            </S.TotalCount>
          </S.AddCategoryWrapper>
        </div>
      </div>
    </S.CategoryManageListWrapper>
  );
};

export default CategoryManageList;
