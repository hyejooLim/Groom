import { useQuery } from '@tanstack/react-query';
import getComments from '../../apis/getComments';

const useGetComments = (postId: number) =>
  useQuery(['comments', postId], () => getComments(postId), {
    onSuccess: (data) => {
      console.log('comments', data);
    },
  });

export default useGetComments;
