import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateCategories from '../../apis/categories/updateCategories';

const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

export default useUpdateCategories;
