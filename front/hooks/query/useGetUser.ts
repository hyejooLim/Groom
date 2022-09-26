import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '../../recoil/user';
import { managePostsState } from '../../recoil/manage';
import getUser from '../../apis/user/getUser';

const useGetUser = () => {
  const setUser = useSetRecoilState(userState);
  const setManagePosts = useSetRecoilState(managePostsState);

  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data); // 새로고침하면 null
      setManagePosts(data?.posts);

      console.log('user', data);
    },
    refetchOnWindowFocus: false,
  });
};

export default useGetUser;
