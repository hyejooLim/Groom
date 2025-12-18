import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getUser from "../../apis/user/getUser";
import updateUser from "../../apis/user/updateUser";
import getUserWithEmail from "../../apis/user/getUserWithEmail";

const useGetUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return query;
};

const useGetUserWithEmail = (email: string) => {
  const query = useQuery({
    queryKey: ["user", email],
    queryFn: () => getUserWithEmail(email),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return query;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export { useGetUser, useGetUserWithEmail, useUpdateUser };
