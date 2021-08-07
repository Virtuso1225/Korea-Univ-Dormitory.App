import React from 'react';
import CalendarComponent from './CalendarComponent';
import { BackgroundWrapper } from './DropOutStyle';
import { BotttomWrapper, CalenderWrapper } from './TemperatureStyle';
import Calendar from '../calendar/Calendar';

const Temperature = () => {
  return (
    <BackgroundWrapper>
      <CalenderWrapper>
        {/* <CalendarComponent /> */}
        <Calendar />
      </CalenderWrapper>
      <BotttomWrapper />
    </BackgroundWrapper>
  );
};

export default Temperature;
