import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { DateContainer, DateStyle, Temperature } from './MainStyle';

const DateHeader = () => {
  moment.locale('ko');
  const [today, setToday] = useState(moment().format('M월 D일 dddd'));

  const getTime = () => {
    setToday(moment().locale('ko').format('M월 D일 dddd'));
  };

  useEffect(() => {
    getTime();
    setInterval(getTime, 1000);
  }, []);

  return (
    <DateContainer>
      <DateStyle>{today}</DateStyle>
      <Temperature>발열체크 하셨나요?</Temperature>
    </DateContainer>
  );
};

export default DateHeader;
