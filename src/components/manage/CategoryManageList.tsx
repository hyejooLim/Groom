import React, { FC, useState, useCallback, useEffect, ChangeEvent, DragEvent } from 'react';
import { Box, TextField } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import useInput from '@/hooks/common/input';
import { CategoryItem } from '@/@types/types';
import {
  changeProperty,
  changePriorityWhenDrop,
  changePriorityWhenDropExcludeNewItem,
  changePriorityWhenDelete,
  changePriorityWhenDeleteExcludeNewItem,
} from '@/utils/newList';
import Button from '../common/Button';
import { useManageStore } from '@/stores/useManageStore';

interface CategoryManageListProps {
  categories: CategoryItem[];
}

const CategoryManageList: FC<CategoryManageListProps> = ({ categories }) => {
  const [category, onChangeCategory, setCategory] = useInput('');
  const [showInput, setShowInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryItem>({
    id: null,
    name: '',
    priority: null,
  });
  const [newCategories, setNewCategories] = useState<CategoryItem[]>([]);
  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);

  const categoryJson = useManageStore((state) => state.categoryJson);
  const setCategoryJson = useManageStore((state) => state.setCategoryJson);

  useEffect(() => {
    if (categories) {
      setNewCategories(categories);
    }
  }, [categories]);

  const onChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentCategory({ ...currentCategory, name: e.target.value });
    },
    [currentCategory],
  );

  const onClickUpdateButton = useCallback((categoryId: number, categoryName: string, idx: number) => {
    setCurrentCategory({ id: categoryId, name: categoryName, priority: idx });
  }, []);

  const onUpdateCategory = useCallback(() => {
    setNewCategories(changeProperty({ array: newCategories, state: currentCategory }));

    if (categoryJson.append.find((item) => item.id === currentCategory.id)) {
      setCategoryJson((prevState) => {
        return {
          ...prevState,
          append: changeProperty({
            array: categoryJson.append,
            state: currentCategory,
          }),
        };
      });
    } else {
      setCategoryJson((prevState) => {
        return {
          ...prevState,
          update: categoryJson.update.find((item) => item.id === currentCategory.id)
            ? changeProperty({
                array: categoryJson.update,
                state: currentCategory,
              })
            : [
                ...prevState.update,
                {
                  id: currentCategory.id,
                  name: currentCategory.name,
                  priority: currentCategory.priority,
                },
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
      const _categories = [...newCategories];
      setNewCategories(_categories.filter((item) => item.id !== categoryId));

      const deletedItemIdx = _categories.findIndex((item) => item.id === categoryId);

      if (categoryJson.append.find((item) => item.id === categoryId)) {
        const _newAppendList = [...categoryJson.append];
        const newAppendList = _newAppendList.filter((item) => item.id !== categoryId);

        setCategoryJson((prevState) => {
          return {
            ...prevState,
            append: changePriorityWhenDelete({
              array: newAppendList,
              state: { deletedItemIdx },
            }),
            update: changePriorityWhenDelete({
              array: categoryJson.update,
              state: { deletedItemIdx },
            }),
          };
        });
      } else {
        setCategoryJson((prevState) => {
          const _newUpdaeList = [...categoryJson.update];
          const newUpdaeList = _newUpdaeList.filter((item) => item.id !== categoryId);

          return {
            ...prevState,
            append: changePriorityWhenDelete({
              array: categoryJson.append,
              state: { deletedItemIdx },
            }),
            update: changePriorityWhenDeleteExcludeNewItem({
              array: {
                main: newCategories,
                append: categoryJson.append,
                update: newUpdaeList,
              },
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
    [newCategories],
  );

  const onClickAddCategoryField = useCallback(() => {
    setShowInput(true);
  }, []);

  const onCancelAddCategory = useCallback(() => {
    setShowInput(false);
    setCategory('');
  }, []);

  const onAddCategory = useCallback(() => {
    const maxCategoryId = newCategories.length > 0 ? Math.max(...newCategories.map((item) => item.id ?? 0)) : 0;

    if (newCategories.length === 100) {
      alert('최대 100개의 카테고리를 추가할 수 있습니다.');
      return;
    }

    setNewCategories([
      ...newCategories,
      {
        id: maxCategoryId + 1,
        name: category,
        priority: newCategories.length,
      },
    ]);

    setCategoryJson((prevState) => {
      return {
        ...prevState,
        append: [
          ...prevState.append,
          {
            id: maxCategoryId + 1,
            name: category,
            priority: newCategories.length,
          },
        ],
      };
    });

    setShowInput(false);
    setCategory('');
  }, [category]);

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

    setCategoryJson((prevState) => {
      return {
        ...prevState,
        append: changePriorityWhenDrop({
          array: categoryJson.append,
          state: { draggedItemIdx, targetItemIdx },
        }),
        update: changePriorityWhenDropExcludeNewItem({
          array: {
            main: newCategories,
            append: categoryJson.append,
            update: categoryJson.update,
          },
          state: { draggedItemIdx, targetItemIdx },
        }),
      };
    });
  };

  return (
    <div className='my-5 mb-6 rounded-sm bg-extra-light-blue p-2'>
      <div className='relative'>
        <div className='flex flex-col gap-sm'>
          {categories &&
            newCategories?.map((item, idx) =>
              item.id === currentCategory.id ? (
                <div
                  key={item.id}
                  className='flex h-16 items-center border border-border bg-background px-5 text-md box-border'
                >
                  <Box
                    component='form'
                    onSubmit={onUpdateCategory}
                    className='flex w-full items-center justify-between'
                  >
                    <TextField
                      type='text'
                      value={currentCategory.name}
                      onChange={onChangeCategoryName}
                      autoFocus
                      variant='outlined'
                      className='w-[330px]'
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '40px',
                          fontSize: '18px',
                        },
                      }}
                    />
                    <div className='flex items-center gap-x-2'>
                      <Button
                        className='h-8 border border-border px-4 rounded-sm bg-white text-sm text-dark shadow-sm hover:shadow-md'
                        onClick={onCancelUpdateCategoryName}
                      >
                        취소
                      </Button>
                      <Button
                        type='submit'
                        disabled={
                          !currentCategory.name ||
                          !currentCategory.name.trim() ||
                          item.name === currentCategory.name.trim()
                        }
                        className='h-8 border border-border px-4 rounded-sm bg-[#333] text-sm text-white shadow-sm hover:bg-[#333]/90 hover:shadow-md disabled:bg-gray-400'
                      >
                        확인
                      </Button>
                    </div>
                  </Box>
                </div>
              ) : (
                item.id !== 0 && (
                  <div
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
                    className='group flex h-16 items-center border border-[#e0e5ee] bg-white px-5 text-[15px] box-border hover:border-[#808080]'
                  >
                    <div className='-ml-2 mr-2 mt-1 p-2 text-[#bbb] hover:cursor-pointer group-hover:text-[#808080]'>
                      <MenuOutlinedIcon />
                    </div>
                    <div className='flex w-full justify-between'>
                      <div className='mr-[10px] flex w-[320px] items-center'>
                        <span className='text-[18px]'>{item.name}</span>
                        <span className='ml-[4px] text-[13px] text-[#808080]'>({item.posts?.length || 0})</span>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <Button
                          className='h-8 hidden group-hover:block border border-solid border-border rounded-sm px-4 text-sm shadow-sm hover:shadow-md'
                          onClick={() => onClickUpdateButton(item.id, item.name, idx)}
                        >
                          수정
                        </Button>
                        <Button
                          disabled={item.posts?.length > 0}
                          className='h-8 hidden group-hover:block border border-solid border-border rounded-sm px-4 text-sm shadow-sm hover:shadow-md disabled:text-gray-400'
                          onClick={() => onDeleteCategory(item.id)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ),
            )}
          {showInput && (
            <div className='flex h-16 items-center border border-[#e0e5ee] bg-[#fbfbfb] px-5 text-md box-border'>
              <Box component='form' onSubmit={onAddCategory} className='flex w-full items-center justify-between'>
                <TextField
                  type='text'
                  value={category}
                  onChange={onChangeCategory}
                  autoFocus
                  variant='outlined'
                  className='w-[330px]'
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '40px',
                      fontSize: '18px',
                    },
                  }}
                />
                <div className='flex items-center gap-x-2'>
                  <Button
                    className='h-8 border border-border px-4 rounded-sm bg-white text-sm text-dark shadow-sm hover:shadow-md'
                    onClick={onCancelAddCategory}
                  >
                    취소
                  </Button>
                  <Button
                    type='submit'
                    disabled={!category || !category.trim()}
                    className='h-8 border border-border px-4 rounded-sm bg-[#333] text-sm text-white shadow-sm hover:bg-[#333]/90 hover:shadow-md disabled:bg-gray-400'
                  >
                    확인
                  </Button>
                </div>
              </Box>
            </div>
          )}
        </div>
        <div
          onClick={onClickAddCategoryField}
          className='mt-2 flex h-16 items-center justify-between border border-dotted border-[#acb3bf] px-5 py-1 text-xl leading-[48px] hover:cursor-pointer hover:border-[#888]'
        >
          <div>
            <AddOutlinedIcon />
            <span className='ml-[14px]'>카테고리 추가</span>
          </div>
          <div className='text-sm text-[#959595]'>
            <span className='text-[#333]'>{newCategories?.length}</span> / 100
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManageList;
