import React, { useState } from 'react';
import styled from 'styled-components';

const CounterWrapper = styled.div`
  font-size: 13px;
  margin-top: 80px;
  padding: 0;
  line-height: 200%;
  text-align: center;

  .today {
    color: #07a;
  }

  .total {
    color: #e55;
  }
`;

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
