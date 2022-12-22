import { useMutation } from '@tanstack/react-query';
import sharePost from '../../apis/share/sharePost';

const useSharePost = () => {
  return useMutation(sharePost);
};

export { useSharePost };
