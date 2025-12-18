import { useQuery } from "@tanstack/react-query";
import getTempPosts from "../../apis/tempPosts/getTempPosts";

const useGetTempPosts = () =>
  useQuery({
    queryKey: ["tempPosts"],
    queryFn: getTempPosts,
  });

export default useGetTempPosts;
