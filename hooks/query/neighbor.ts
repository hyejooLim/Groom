import { useMutation, useQueryClient } from "@tanstack/react-query";

import addNeighbor from "../../apis/neighbor/addNeighbor";
import cancelNeighbor from "../../apis/neighbor/cancelNeighbor";

const useAddNeighbor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNeighbor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

const useCancelNeighbor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelNeighbor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["neighbors"] });
    },
  });
};

export { useAddNeighbor, useCancelNeighbor };
