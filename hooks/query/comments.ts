import { useQuery } from "@tanstack/react-query";
import getComments from "../../apis/comments/getComments";

const useGetComments = (postId: number) => {
  const query = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    refetchOnWindowFocus: false,
  });

  return query;
};

export default useGetComments;
