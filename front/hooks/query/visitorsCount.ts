import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import getVisitorsCount from '../../apis/count';
import { todayCountState, totalCountState } from '../../recoil/count';

const useGetVisitorsCount = () => {
  const setTodayCount = useSetRecoilState(todayCountState);
  const setTotalCount = useSetRecoilState(totalCountState);

  return useQuery(['visitorsCount'], () => getVisitorsCount(), {
    onSuccess: (data) => {
      setTodayCount(data?.todayCount);
      setTotalCount(data?.totalCount);
      console.log('visitorsCount', data);
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
  });
};

export default useGetVisitorsCount;
