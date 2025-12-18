import { useQuery } from "@tanstack/react-query";
import getNeighbors from "../../apis/neighbors/getNeighbors";

const useGetNeighbors = () => {
  const query = useQuery({
    queryKey: ["neighbors"],
    queryFn: getNeighbors,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};

export default useGetNeighbors;
