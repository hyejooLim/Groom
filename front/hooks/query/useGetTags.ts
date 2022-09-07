import { useQuery } from '@tanstack/react-query';
import getTags from '../../apis/tags/getTags';

const useGetTags = () =>
  useQuery(['tags'], getTags, {
    onSuccess: (data) => {
      console.log('tags', data);
    },
  });

export default useGetTags;
