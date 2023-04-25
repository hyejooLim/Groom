import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getUser from '../../apis/user/getUser';
import updateUser from '../../apis/user/updateUser';

const useGetUser = (email?: string) => {
  return useQuery(['user', email], () => getUser(email), {
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
