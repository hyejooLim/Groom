import { CategoryItem } from '../types';

interface ChangePropertyProps<T> {
  array: T[];
  state: T;
}

interface ChangePriorityWhenDropProps<T> {
  array: T[];
  state: {
    draggedItemIdx: number;
    targetItemIdx: number;
  };
}

interface ChangePriorityWhenDropExcludeNewItemProps<T> {
  array: {
    main: T[];
    update: T[];
  };
  state: {
    draggedItemIdx: number;
    targetItemIdx: number;
  };
}

interface ChangePriorityWhenDeleteProps<T> {
  array: T[];
  state: { deletedItemIdx: number };
}

interface ChangePriorityWhenDeleteExcludeNewItemProps<T> {
  array: {
    main: T[];
    update: T[];
  };
  state: { deletedItemIdx: number };
}

export const changeProperty = <T extends CategoryItem>({ array, state }: ChangePropertyProps<T>) => {
  return array.reduce((acc: T[], cur: T) => {
    let newObj = cur;

    if (cur.id === state.id) {
      newObj = { ...newObj, name: state.name };
    }

    acc.push(newObj);
    return acc;
  }, []);
};

export const changePriorityWhenDrop = <T extends CategoryItem>({ array, state }: ChangePriorityWhenDropProps<T>) => {
  return array.reduce((acc: T[], cur: T) => {
    let newObj = cur;

    if (cur.priority === state.draggedItemIdx) {
      newObj = { ...newObj, priority: state.targetItemIdx };
    } else if (state.draggedItemIdx < cur.priority && cur.priority <= state.targetItemIdx) {
      newObj = { ...newObj, priority: newObj.priority - 1 };
    } else if (state.targetItemIdx <= cur.priority && cur.priority < state.draggedItemIdx) {
      newObj = { ...newObj, priority: newObj.priority + 1 };
    }

    acc.push(newObj);
    return acc;
  }, []);
};

export const changePriorityWhenDropExcludeNewItem = <T extends CategoryItem>({
  array,
  state,
}: ChangePriorityWhenDropExcludeNewItemProps<T>) => {
  let newUpdateList: T[] = [...array.update];

  array.main.forEach((item, idx) => {
    let newObj = item;

    if (item.id < 0) return;

    // 드래그 아이템 priority: targetItemIdx
    if (idx === state.draggedItemIdx) {
      newObj = { ...newObj, priority: state.targetItemIdx };

      // update list에 이미 존재하는 경우: 해당 아이템을 제거한 후 추가
      if (newUpdateList.find((updateItem) => updateItem.id === item.id)) {
        let idx = newUpdateList.findIndex((updateItem) => updateItem.id === item.id);

        newUpdateList.splice(idx, 1);
      }
      newUpdateList.push(newObj);
    }
    // 드래그 아이템의 idx가 타겟 아이템의 idx보다 작은 경우 그 사이 아이템 priority: 현재 idx - 1
    else if (state.draggedItemIdx < idx && idx <= state.targetItemIdx) {
      newObj = { ...newObj, priority: idx - 1 };

      if (newUpdateList.find((updateItem) => updateItem.id === item.id)) {
        let idx = newUpdateList.findIndex((updateItem) => updateItem.id === item.id);

        newUpdateList.splice(idx, 1);
      }
      newUpdateList.push(newObj);
    }
    // 드래그 아이템의 idx가 타겟 아이템의 idx보다 큰 경우 그 사이 아이템 priority: 현재 idx + 1
    else if (state.targetItemIdx <= idx && idx < state.draggedItemIdx) {
      newObj = { ...newObj, priority: idx + 1 };

      if (newUpdateList.find((updateItem) => updateItem.id === item.id)) {
        let idx = newUpdateList.findIndex((updateItem) => updateItem.id === item.id);

        newUpdateList.splice(idx, 1);
      }
      newUpdateList.push(newObj);
    }
  });

  return newUpdateList;
};

export const changePriorityWhenDelete = <T extends CategoryItem>({
  array,
  state,
}: ChangePriorityWhenDeleteProps<T>) => {
  return array.reduce((acc: T[], cur: T) => {
    let newObj = cur;

    if (state.deletedItemIdx < cur.priority) {
      newObj = { ...newObj, priority: newObj.priority - 1 };
    }

    acc.push(newObj);
    return acc;
  }, []);
};

export const changePriorityWhenDeleteExcludeNewItem = <T extends CategoryItem>({
  array,
  state,
}: ChangePriorityWhenDeleteExcludeNewItemProps<T>) => {
  let newUpdateList: T[] = [...array.update];

  array.main.forEach((item, idx) => {
    let newObj = item;

    if (item.id < 0) return;

    if (state.deletedItemIdx < idx) {
      newObj = { ...newObj, priority: idx - 1 };

      if (newUpdateList.find((updateItem) => updateItem.id === item.id)) {
        let idx = newUpdateList.findIndex((updateItem) => updateItem.id === item.id);

        newUpdateList.splice(idx, 1);
      }
      newUpdateList.push(newObj);
    }
  });

  return newUpdateList;
};
