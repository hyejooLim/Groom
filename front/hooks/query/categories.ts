import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { categoriesState } from '../../recoil/categories';
import getCategories from '../../apis/categories/getCategories';
import updateCategories from '../../apis/categories/updateCategories';

const useGetCategories = () => {
  const setCategories = useSetRecoilState(categoriesState);

  return useQuery(['categories'], getCategories, {
    onSuccess: (data) => {
      setCategories(data);
    },
    refetchOnWindowFocus: false,
  });
};

const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

export { useGetCategories, useUpdateCategories };
