import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '../../recoil/user';
import { managePostsState } from '../../recoil/manage';
import { manageSubscribedPostsState } from '../../recoil/manage';
import getUser from '../../apis/user/getUser';
import updateUser from '../../apis/user/updateUser';

const useGetUser = () => {
  const setUser = useSetRecoilState(userState);
  const setManagePosts = useSetRecoilState(managePostsState);
  const setManageSubscribedPosts = useSetRecoilState(manageSubscribedPostsState);

  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data);
      setManagePosts(data?.posts);
      setManageSubscribedPosts(data?.subscribedPosts);

      console.log('user', data);
    },
    refetchOnWindowFocus: false,
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export { useGetUser, useUpdateUser };
