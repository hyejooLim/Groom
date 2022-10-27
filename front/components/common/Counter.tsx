import React from 'react';

import useGetVisitorsCount from '../../hooks/query/visitorsCount';
import { CounterWrapper } from '../../styles/ts/components/common/Counter';

const Counter = () => {
  const { data } = useGetVisitorsCount();

  return (
    <CounterWrapper>
      <span className='today'>{data?.todayCount ?? 0}</span> / <span className='total'>{data?.totalCount ?? 0}</span>
    </CounterWrapper>
  );
};

export default Counter;
