import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import getCategories from '../../apis/categories/getCategories';
import updateCategories from '../../apis/categories/updateCategories';

const useGetCategories = () =>
  useQuery(['categories'], getCategories, {
    refetchOnWindowFocus: false,
  });

const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

export { useGetCategories, useUpdateCategories };
