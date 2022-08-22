import { useQuery } from '@tanstack/react-query';
import getPost from '../../apis/getPost';

const useGetPost = (id: number) => {
  return useQuery(['post'], () => getPost(id), {
    onSuccess: (data) => {
      console.log('useGetPost', data);
    },
    onError: (err) => {
      throw new Error('Request failed.', err);
    },
  });
};

export default useGetPost;
