import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from '../styles/ts/components/ReactDatePicker';

const ReactDatePicker = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [hour, setHour] = useState(String(dayjs().hour()));
  const [minute, setMinute] = useState(String(dayjs().minute()));

  useEffect(() => {
    if (isOpenCalendar) {
      document.addEventListener('mousedown', onCloseCalendar);
    }

    return () => {
      document.removeEventListener('mousedown', onCloseCalendar);
    };
  });

  const onCloseCalendar = useCallback((e) => {
    const { className } = e.target;

    if (!className.includes('react-datepicker') && !className.includes('date_input')) {
      setIsOpenCalendar(false);
    }
  }, []);

  const onClickInput = () => {
    setIsOpenCalendar((prev) => !prev);
  };

  const onChangeInput = (date: Date) => {
    setIsOpenCalendar(false);
    setStartDate(dayjs(date).format('YYYY-MM-DD'));
  };

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
        className={classNames('date_input', { on: isOpenCalendar })}
        locale={ko}
        selected={new Date(startDate)}
        dateFormat='yyyy-MM-dd'
        minDate={new Date()}
        open={isOpenCalendar}
        onInputClick={onClickInput}
        onChange={onChangeInput}
        readOnly
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
