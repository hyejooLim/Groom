import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUser from '../../apis/user/getUser';
import updateUser from '../../apis/user/updateUser';

const useGetUser = () => {
  return useQuery(['user'], getUser, {
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
