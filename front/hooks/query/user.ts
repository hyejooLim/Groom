import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { userState } from '../../recoil/user';
import getUser from '../../apis/user/getUser';
import updateUser from '../../apis/user/updateUser';

const useGetUser = () => {
  const setUser = useSetRecoilState(userState);

  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      setUser(data);
      console.log('user', data);
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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
