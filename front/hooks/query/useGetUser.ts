import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getUser from '../../apis/user/getUser';
import { userState } from '../../recoil/user';
import { managePostsState } from '../../recoil/manage';
import { manageSubscribedPostsState } from './../../recoil/manage';

const useGetUser = () => {
  const setUser = useSetRecoilState(userState);
  const setManagePosts = useSetRecoilState(managePostsState);
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data); // 새로고침하면 null
      setManagePosts(data?.posts);
      setManageSubscribedPosts(data?.subscribedPosts);

      console.log('user', data);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
