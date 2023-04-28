import { useQuery } from '@tanstack/react-query';
import getNeighbors from '../../apis/neighbors/getNeighbors';

const useGetNeighbors = () =>
  useQuery(['neighbors'], getNeighbors, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export default useGetNeighbors;
