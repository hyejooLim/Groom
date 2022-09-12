import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateUser from '../../apis/user/updateUser';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export default useUpdateUser;
