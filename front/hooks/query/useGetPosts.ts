import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import getPosts from '../../apis/posts/getPosts';
import { mainPostsState } from '../../recoil/posts';

const useGetPosts = () => {
  const setMainPosts = useSetRecoilState(mainPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setMainPosts(data.filter((post) => post.isPublic));
      console.log('posts', data);
    },
  });
};

export default useGetPosts;
