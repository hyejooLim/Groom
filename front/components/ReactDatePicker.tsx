import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from '../styles/ts/components/ReactDatePicker';

const ReactDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date(dayjs().format('YYYY-MM-DD')));
  const [hour, setHour] = useState(String(dayjs().hour()));
  const [minute, setMinute] = useState(String(dayjs().minute()));

  useEffect(() => {
    console.log('startDate', startDate);
  }, [startDate]);

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);

    if (numberValue === 0) {
      setHour('00');
    }

    if (numberValue < 0) {
      setHour(String(Math.abs(numberValue)));
    }

    if (0 < numberValue && numberValue < 24) {
      String(numberValue).length === 1 ? setHour('0' + String(numberValue)) : setHour(String(numberValue));
    }

    if (23 < numberValue) {
      setHour('23');
    }
  };

  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);

    if (numberValue === 0) {
      setMinute('00');
    }

    if (numberValue < 0) {
      setMinute(String(Math.abs(numberValue)));
    }

    if (0 < numberValue && numberValue < 60) {
      String(numberValue).length === 1 ? setMinute('0' + String(numberValue)) : setMinute(String(numberValue));
    }

    if (59 < numberValue) {
      setMinute('59');
    }
  };

  return (
    <S.DatePickerWrapper>
      <DatePicker
        locale={ko}
        selected={startDate}
        dateFormat='yyyy-MM-dd'
        minDate={new Date()}
        onChange={(date: Date) => setStartDate(date)}
      ></DatePicker>
      <S.DateBox>
        <input type='number' value={hour} onChange={onChangeHour} />
      </S.DateBox>
      <span className='sign'>:</span>
      <S.DateBox>
        <input type='number' value={minute} onChange={onChangeMinute} />
      </S.DateBox>
    </S.DatePickerWrapper>
  );
};

export default ReactDatePicker;
