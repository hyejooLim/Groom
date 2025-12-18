import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getCategories from "../../apis/categories/getCategories";
import updateCategories from "../../apis/categories/updateCategories";

const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 180000,
    refetchOnWindowFocus: false,
  });

  return query;
};

const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useGetCategories, useUpdateCategories };
