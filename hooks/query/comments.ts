import { useQuery } from '@tanstack/react-query';
import getComments from '../../apis/comments/getComments';

const useGetComments = (postId: number) =>
  useQuery(['comments', postId], () => getComments(postId), {
    refetchOnWindowFocus: false,
  });

export default useGetComments;
