import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import getPosts from '../../apis/posts/getPosts';
import { publicPostsState } from './../../recoil/posts';

const useGetPosts = () => {
  const setPublicPosts = useSetRecoilState(publicPostsState);

  return useQuery(['posts'], getPosts, {
    onSuccess: (data) => {
      setPublicPosts(data.filter((post) => post.isPublic));
      console.log('posts', data);
    },
    // staleTime: Infinity,
    // cacheTime: Infinity,
  });
};

export default useGetPosts;
