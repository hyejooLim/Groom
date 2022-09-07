import { useQuery } from '@tanstack/react-query';
import getPosts from '../../apis/posts/getPosts';

const useGetPosts = () =>
  useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      console.log('useGetPosts', data);
    },
  });

export default useGetPosts;
