import React, { useState } from 'react';
import { CounterWrapper } from '../styles/ts/components/Counter';

const Counter = () => {
  const [todayVisitorNumber, setTodayVisitorNumber] = useState(23);
  const [totalVisitorNumber, setTotalVisitorNumber] = useState(1500);

  return (
    <CounterWrapper>
      <span className='today'>{todayVisitorNumber}</span> / <span className='total'>{totalVisitorNumber}</span>
    </CounterWrapper>
  );
};

export default Counter;
