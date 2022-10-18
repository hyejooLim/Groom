import React from 'react';
import { useRecoilValue } from 'recoil';

import { todayCountState, totalCountState } from '../../recoil/count';
import { CounterWrapper } from '../../styles/ts/components/common/Counter';

const Counter = () => {
  const todayCount = useRecoilValue(todayCountState);
  const totalCount = useRecoilValue(totalCountState);

  return (
    <CounterWrapper>
      <span className='today'>{todayCount ?? 0}</span> / <span className='total'>{totalCount ?? 0}</span>
    </CounterWrapper>
  );
};

export default Counter;
