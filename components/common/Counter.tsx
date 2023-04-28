import React from 'react';
import useSWR from 'swr';

import { VisitorsCount } from '../../types';
import { CounterWrapper } from '../../styles/ts/components/common/Counter';

const Counter = () => {
  const { data } = useSWR<VisitorsCount>('/count');

  return (
    <CounterWrapper>
      <span className='today'>{data?.todayCount.toLocaleString() ?? 0}</span> /{' '}
      <span className='total'>{data?.totalCount.toLocaleString() ?? 0}</span>
    </CounterWrapper>
  );
};

export default Counter;
