import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
  DragEvent,
} from "react";
import { Button, Form } from "antd";
import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";

import useInput from "../../hooks/common/input";
import { CategoryItem } from "../../types";
import {
  changeProperty,
  changePriorityWhenDrop,
  changePriorityWhenDropExcludeNewItem,
  changePriorityWhenDelete,
  changePriorityWhenDeleteExcludeNewItem,
} from "../../utils/newList";
import * as S from "../../styles/ts/components/manage/CategoryManageList";
import { categoryJsonState } from "../../recoil/manage";

interface CategoryManageListProps {
  categories: CategoryItem[];
}

const CategoryManageList: FC<CategoryManageListProps> = ({ categories }) => {
  const [category, onChangeCategory, setCategory] = useInput("");
  const [showInput, setShowInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryItem>({
    id: null,
    name: "",
    priority: null,
  });
  const [newCategories, setNewCategories] = useState<CategoryItem[]>([]);
  const [draggedItemIdx, setDraggedItemIdx] = useState(0);
  const [targetItemIdx, setTargetItemIdx] = useState(0);

  const [categoryJson, setCategoryJson] = useRecoilState(categoryJsonState);

  useEffect(() => {
    if (categories) {
      setNewCategories(categories);
    }
  }, [categories]);

  const onChangeCategoryName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentCategory({ ...currentCategory, name: e.target.value });
    },
    [currentCategory]
  );

  const onClickUpdateButton = useCallback(
    (categoryId: number, categoryName: string, idx: number) => {
      setCurrentCategory({ id: categoryId, name: categoryName, priority: idx });
    },
    []
  );

  const onUpdateCategory = useCallback(() => {
    setNewCategories(
      changeProperty({ array: newCategories, state: currentCategory })
    );

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
          update: categoryJson.update.find(
            (item) => item.id === currentCategory.id
          )
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
    setCurrentCategory({ id: null, name: "", priority: null });
  }, [currentCategory]);

  const onCancelUpdateCategoryName = useCallback(() => {
    setCurrentCategory({ id: null, name: "", priority: null });
  }, []);

  const onDeleteCategory = useCallback(
    (categoryId: number) => {
      const _categories = [...newCategories];
      setNewCategories(_categories.filter((item) => item.id !== categoryId));

      const deletedItemIdx = _categories.findIndex(
        (item) => item.id === categoryId
      );

      if (categoryJson.append.find((item) => item.id === categoryId)) {
        const _newAppendList = [...categoryJson.append];
        const newAppendList = _newAppendList.filter(
          (item) => item.id !== categoryId
        );

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
          const newUpdaeList = _newUpdaeList.filter(
            (item) => item.id !== categoryId
          );

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
    [newCategories]
  );

  const onClickAddCategoryField = useCallback(() => {
    setShowInput(true);
  }, []);

  const onCancelAddCategory = useCallback(() => {
    setShowInput(false);
    setCategory("");
  }, []);

  const onAddCategory = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      const maxCategoryId = Math.max(...newCategories.map((item) => item.id));

      if (newCategories.length === 100) {
        alert("최대 100개의 카테고리를 추가할 수 있습니다.");
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
      setCategory("");
    },
    [category]
  );

  // Drag & Drop
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setDraggedItemIdx(Number(e.currentTarget.dataset.index));
    e.currentTarget.classList.add("drag_element");
  };

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drag_element");
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    setTargetItemIdx(Number(e.currentTarget.dataset.index));
    e.currentTarget.classList.add("drop_zone");
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drop_zone");
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drop_zone");

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
    <S.CategoryManageListWrapper>
      <div className="set_order">
        <div className="wrap_order">
          <div className="list_order">
            {categories &&
              newCategories?.map((item, idx) =>
                item.id === currentCategory.id ? (
                  <S.ItemWrapper
                    key={item.id}
                    style={{ background: "#fbfbfb" }}
                  >
                    <Form
                      onFinish={onUpdateCategory}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <S.StyledInput
                        type="text"
                        value={currentCategory.name}
                        onChange={onChangeCategoryName}
                        autoFocus
                      />
                      <S.FormButton>
                        <Button
                          className="cancel btn"
                          onClick={onCancelUpdateCategoryName}
                        >
                          취소
                        </Button>
                        <Button
                          className="submit btn"
                          htmlType="submit"
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
                  item.id !== 0 && (
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
                        <MenuOutlined
                          {...({} as React.ComponentProps<typeof MenuOutlined>)}
                        />
                      </S.DragIconWrapper>
                      <S.TextArea>
                        <div className="category_name">
                          <span>{item.name}</span>
                          <span
                            style={{
                              fontSize: "13px",
                              marginLeft: "4px",
                              color: "#808080",
                            }}
                          >
                            ({item.posts?.length || 0})
                          </span>
                        </div>
                        <S.EditButton>
                          <Button
                            className="modify btn"
                            onClick={() =>
                              onClickUpdateButton(item.id, item.name, idx)
                            }
                          >
                            수정
                          </Button>
                          <Button
                            className="delete btn"
                            onClick={() => onDeleteCategory(item.id)}
                            disabled={item.posts?.length > 0}
                          >
                            삭제
                          </Button>
                        </S.EditButton>
                      </S.TextArea>
                    </S.ItemWrapper>
                  )
                )
              )}
            {showInput && (
              <S.ItemWrapper style={{ background: "#fbfbfb" }}>
                <Form
                  onFinish={onAddCategory}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <S.StyledInput
                    type="text"
                    value={category}
                    onChange={onChangeCategory}
                    autoFocus
                  />
                  <S.FormButton>
                    <Button
                      className="cancel btn"
                      onClick={onCancelAddCategory}
                    >
                      취소
                    </Button>
                    <Button
                      className="submit btn"
                      htmlType="submit"
                      disabled={!category || !category.trim()}
                    >
                      확인
                    </Button>
                  </S.FormButton>
                </Form>
              </S.ItemWrapper>
            )}
          </div>
          <S.AddCategoryWrapper onClick={onClickAddCategoryField}>
            <div>
              <PlusOutlined
                {...({} as React.ComponentProps<typeof PlusOutlined>)}
              />
              <span className="add_category_text">카테고리 추가</span>
            </div>
            <S.TotalCount>
              <span style={{ color: "#333" }}>{newCategories?.length}</span> /
              100
            </S.TotalCount>
          </S.AddCategoryWrapper>
        </div>
      </div>
    </S.CategoryManageListWrapper>
  );
};

export default CategoryManageList;
