import React from 'react';
import useSWR from 'swr';

import { VisitorsCount } from '../../types';

const Counter = () => {
  const { data } = useSWR<VisitorsCount>('/count');

  return (
    <div className='mt-20 text-center'>
      <span className='text-light-blue'>{data?.todayCount.toLocaleString() ?? 0}</span> /{' '}
      <span className='text-accent'>{data?.totalCount.toLocaleString() ?? 0}</span>
    </div>
  );
};

export default Counter;
