import React from 'react';
import CalendarComponent from './CalendarComponent';
import { BackgroundWrapper } from './DropOutStyle';
import { BotttomWrapper, CalenderWrapper } from './TemperatureStyle';

const Temperature = () => {
  return (
    <BackgroundWrapper>
      <CalenderWrapper>
        <CalendarComponent />
      </CalenderWrapper>
      <BotttomWrapper />
    </BackgroundWrapper>
  );
};

export default Temperature;
