import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import getPosts from '../../apis/posts/getPosts';
import { mainPostsState } from '../../recoil/posts';
import { getPublicAndPublishedPosts } from '../../lib/posts';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(getPublicAndPublishedPosts(data));
      console.log('posts', data);
    },
  });
};

export default useGetPosts;
