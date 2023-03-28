import { useQuery } from '@tanstack/react-query';
import getVisitorsCount from '../../apis/count';

const useGetVisitorsCount = () =>
  useQuery(['visitorsCount'], getVisitorsCount, {
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

export default useGetVisitorsCount;
