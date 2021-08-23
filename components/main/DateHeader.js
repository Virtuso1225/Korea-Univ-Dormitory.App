import React from 'react';
import { DateContainer, DateStyle, Temperature } from './MainStyle';

const DateHeader = () => {
  const date = new Date();
  const [month, day, index] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getDay() - 1,
  ];
  const week = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];
  return (
    <DateContainer>
      <DateStyle>
        {month}월{day}일{week[index]}
      </DateStyle>
      <Temperature>발열체크 하셨나요?</Temperature>
    </DateContainer>
  );
};

export default DateHeader;
