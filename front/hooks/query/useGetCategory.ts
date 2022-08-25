import { useQuery } from '@tanstack/react-query';
import getCategory from '../../apis/getCategory';

const useGetCategory = (name: string) =>
  useQuery(['category'], () => getCategory(name), {
    onSuccess: (data) => {
      console.log('category', data);
    },
    onError: (err) => {
      throw new Error('Request failed.', err);
    },
  });

export default useGetCategory;
