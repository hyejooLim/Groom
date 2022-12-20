import { useMutation, useQueryClient } from '@tanstack/react-query';
import addNeighbor from '../../apis/neighbor/addNeighbor';

const useAddNeighbor = () => {
  const queryClient = useQueryClient();

  return useMutation(addNeighbor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

export { useAddNeighbor };
