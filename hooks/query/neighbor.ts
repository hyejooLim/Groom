import { useMutation, useQueryClient } from '@tanstack/react-query';

import addNeighbor from '../../apis/neighbor/addNeighbor';
import cancelNeighbor from '../../apis/neighbor/cancelNeighbor';

const useAddNeighbor = () => {
  const queryClient = useQueryClient();

  return useMutation(addNeighbor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};

const useCancelNeighbor = () => {
  const queryClient = useQueryClient();

  return useMutation(cancelNeighbor, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['neighbors']);
    },
  });
};

export { useAddNeighbor, useCancelNeighbor };
