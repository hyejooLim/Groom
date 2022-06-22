import React, { useState, useCallback, ChangeEvent, Dispatch } from 'react';

type ReturnType<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<React.SetStateAction<T>>];

const useInput = <T,>(initialValue: T): ReturnType<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
