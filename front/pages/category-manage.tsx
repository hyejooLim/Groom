import React, { FormEvent, useCallback, useState, useRef, DragEvent, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';

import ManageLayout from '../components/layouts/ManageLayout';
import { CategoryItem } from '../types';
import useInput from '../hooks/input';
import { categories } from '../components/Category';

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

  .set_btn {
    margin: 0 -29px;
    padding: 14px 29px;
    border-top: 1px px solid #f1f3f6;
    background: #fafbfc;
    display: flex;
    justify-content: flex-end;
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
    font-size: 12px;
    width: 40px;
    height: 26px;
    border: 1px solid #c5cdd7;
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

const SaveDiffButton = styled(Button)`
  width: 140px;
  height: 38px;
  border: 1px solid #333;

  &:not(:enabled) {
    background-color: #fff;
    border-color: #e0e5ee;
    color: #959595;
    box-shadow: none;

    :hover {
      background-color: #fff;
      border-color: #e0e5ee;
      color: #959595;
      box-shadow: none;
    }
  }

  &:enabled {
    color: #fff;
    background: #333;
    border-radius: 1px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 8%);

    :hover {
      border-color: #505050;
      background: #505050;
      box-shadow: 0 2px 5px rgb(0 0 0 / 23%);
    }
  }
`;

const CountTotal = styled.div`
  float: right;
  color: #959595;
  font-size: 12px;
`;

const ManageCategory = () => {
  const [category, onChangeCategory, setCategory] = useInput('');
  const [showInput, setShowInput] = useState(false);

  const [editMode, setEditMode] = useState<CategoryItem>({
    id: '',
    name: '',
  });

  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);
  const [newCategories, setNewCategories] = useState<CategoryItem[]>(categories);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(JSON.stringify(categories) === JSON.stringify(newCategories));
  }, [categories, newCategories]);

  const onClickUpdateBtn = useCallback((categoryId: string, categoryName: string) => {
    setEditMode({ id: categoryId, name: categoryName });
  }, []);

  const onChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditMode({ ...editMode, name: e.target.value });
    },
    [editMode]
  );

  const newList = newCategories.reduce((acc: CategoryItem[], cur: CategoryItem) => {
    let newObj = cur;

    if (cur.id === editMode.id) {
      newObj = { ...newObj, name: editMode.name };
    }

    acc.push(newObj);
    return acc;
  }, []);

  const onUpdateCategoryName = useCallback(() => {
    setNewCategories(newList);
    setEditMode({ id: '', name: '' });
  }, [newList]);

  const onCancelUpdateCategoryName = useCallback(() => {
    setEditMode({ id: '', name: '' });
  }, []);

  const onClickDeleteBtn = useCallback(
    (categoryId: string) => {
      const _categories = [...newCategories];
      setNewCategories(_categories.filter((item) => item.id !== categoryId));
    },
    [newCategories]
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
      setNewCategories([
        ...newCategories,
        {
          id: String(Number(newCategories[newCategories.length - 1].id) + 1),
          name: category,
          posts: [],
        },
      ]);

      setShowInput(false);
      setCategory('');
    },
    [category]
  );

  const onUpdateCategories = useCallback(() => {
    if (categories === newCategories) {
      alert('변경사항이 없습니다.');
      return;
    }

    // 카테고리 수정 api 요청
    // const response = await axios.patch('/category/update', newCategories);
    // setCategorise(response);
    setIsDisabled(true);
  }, [categories, newCategories]);

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
              {newCategories.map((item, idx) =>
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
                <span style={{ color: '#333' }}>{newCategories.length}</span> / 12
              </CountTotal>
            </AddCategoryWrapper>
          </div>
        </div>
        <div className='set_btn'>
          <SaveDiffButton onClick={onUpdateCategories} disabled={isDisabled}>
            변경사항 저장
          </SaveDiffButton>
        </div>
      </ManageCategoryWrapper>
    </ManageLayout>
  );
};

export default ManageCategory;
