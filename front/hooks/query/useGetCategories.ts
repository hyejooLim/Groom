import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getCategories from '../../apis/categories/getCategories';
import { categoriesState } from '../../recoil/categories';

const useGetCategories = () => {
  const setCategories = useSetRecoilState(categoriesState);

  return useQuery(['categories'], getCategories, {
    onSuccess: (data) => {
      setCategories(data);
      console.log('categories', data);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetCategories;
