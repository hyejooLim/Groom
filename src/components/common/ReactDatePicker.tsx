import React, { ChangeEvent, useEffect, useState, useCallback, FC } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface ReactDatePickerProps {
  reserveDate: Dayjs;
  setReserveDate: React.Dispatch<React.SetStateAction<Dayjs>>;
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

  const onChangeDate = (newValue: Dayjs | null) => {
    setIsOpenCalendar(false);
    if (!newValue) return;

    setReserveDate((prev) => {
      const current = prev || dayjs();
      return current.year(newValue.year()).month(newValue.month()).date(newValue.date());
    });
  };

  const onChangeHour = (e: ChangeEvent<HTMLInputElement>) => {
    let numberValue = Number(e.target.value);

    if (isNaN(numberValue)) return;

    if (numberValue < 0) numberValue = 0;
    if (numberValue > 23) numberValue = 23;

    setReserveDate((prev) => {
      const current = prev || dayjs();
      return current.hour(numberValue);
    });
  };

  const onChangeMinute = (e: ChangeEvent<HTMLInputElement>) => {
    let numberValue = Number(e.target.value);

    if (isNaN(numberValue)) return;

    if (numberValue < 0) numberValue = 0;
    if (numberValue > 59) numberValue = 59;

    setReserveDate((prev) => {
      const current = prev || dayjs();
      return current.minute(numberValue);
    });
  };

  return (
    <div className='flex items-center'>
      <DatePicker
        value={dayjs(reserveDate)}
        onChange={onChangeDate}
        slotProps={{
          textField: {
            size: 'small',
          },
        }}
        sx={{
          '& .MuiPickersInputBase-root': {
            marginRight: '10px',
            width: '140px',
          },
        }}
      />
      <TextField
        type='number'
        value={reserveDate ? reserveDate.format('HH') : ''}
        onChange={onChangeHour}
        variant='outlined'
        size='small'
        className='w-16'
      />
      <span className='mx-2'>:</span>
      <TextField
        type='number'
        value={reserveDate ? reserveDate.format('mm') : ''}
        onChange={onChangeMinute}
        variant='outlined'
        size='small'
        className='w-16'
      />
    </div>
  );
};

export default ReactDatePicker;
