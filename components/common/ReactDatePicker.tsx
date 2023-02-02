import React, { ChangeEvent, useEffect, useState, useCallback, FC } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { ReserveDate } from '../../types';
import * as S from '../../styles/ts/components/common/ReactDatePicker';

interface ReactDatePickerProps {
  reserveDate: ReserveDate;
  setReserveDate: React.Dispatch<React.SetStateAction<ReserveDate>>;
}

const ReactDatePicker: FC<ReactDatePickerProps> = ({ reserveDate, setReserveDate }) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

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

    setReserveDate({ ...reserveDate, date: dayjs(date).format('YYYY-MM-DD') });
  };

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);

    if (numberValue === 0) {
      setReserveDate({ ...reserveDate, hour: '00' });
    }

    if (numberValue < 0) {
      setReserveDate({ ...reserveDate, hour: String(Math.abs(numberValue)) });
    }

    if (0 < numberValue && numberValue < 24) {
      String(numberValue).length === 1
        ? setReserveDate({ ...reserveDate, hour: '0' + String(numberValue) })
        : setReserveDate({ ...reserveDate, hour: String(numberValue) });
    }

    if (23 < numberValue) {
      setReserveDate({ ...reserveDate, hour: '23' });
    }
  };

  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);

    if (numberValue === 0) {
      setReserveDate({ ...reserveDate, minute: '00' });
    }

    if (numberValue < 0) {
      setReserveDate({ ...reserveDate, minute: String(Math.abs(numberValue)) });
    }

    if (0 < numberValue && numberValue < 60) {
      String(numberValue).length === 1
        ? setReserveDate({ ...reserveDate, minute: '0' + String(numberValue) })
        : setReserveDate({ ...reserveDate, minute: String(numberValue) });
    }

    if (59 < numberValue) {
      setReserveDate({ ...reserveDate, minute: '59' });
    }
  };

  return (
    <S.DatePickerWrapper>
      <DatePicker
        className={classNames('date_input', { on: isOpenCalendar })}
        locale={ko}
        selected={new Date(reserveDate.date)}
        dateFormat='yyyy-MM-dd'
        minDate={new Date()}
        open={isOpenCalendar}
        onInputClick={onClickInput}
        onChange={onChangeInput}
        readOnly
      ></DatePicker>
      <S.DateBox>
        <input type='number' value={reserveDate.hour} onChange={onChangeHour} />
      </S.DateBox>
      <span className='sign'>:</span>
      <S.DateBox>
        <input type='number' value={reserveDate.minute} onChange={onChangeMinute} />
      </S.DateBox>
    </S.DatePickerWrapper>
  );
};

export default ReactDatePicker;
