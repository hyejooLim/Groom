import { useQuery } from '@tanstack/react-query';
import getCategories from '../../apis/getCategories';

const useGetCategories = () =>
  useQuery(['categories'], getCategories, {
    onSuccess: (data) => {
      console.log('categories', data);
    },
  });

export default useGetCategories;
