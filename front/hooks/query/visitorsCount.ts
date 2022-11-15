import { useQuery } from '@tanstack/react-query';
import getVisitorsCount from '../../apis/count';

const useGetVisitorsCount = () =>
  useQuery(['visitorsCount'], getVisitorsCount, {
    onSuccess: (data) => {
      console.log('visitorsCount', data);
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
  });

export default useGetVisitorsCount;
