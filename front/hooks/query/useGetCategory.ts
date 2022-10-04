import { useQuery } from '@tanstack/react-query';
import getCategory from '../../apis/category/getCategory';

const useGetCategory = (name: string) =>
  useQuery(['category', name], () => getCategory(name), {
    onSuccess: (data) => {
      console.log('category', data);
    },
  });

export default useGetCategory;
