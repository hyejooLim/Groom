import { useQuery } from '@tanstack/react-query';
import getPosts from '../../apis/getPosts';

const useGetPosts = () =>
  useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      console.log('useGetPosts', data);
    },
  });

export default useGetPosts;
