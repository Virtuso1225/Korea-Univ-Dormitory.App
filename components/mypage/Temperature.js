import React from 'react';
import { BackgroundWrapper } from './DropOutStyle';
import { BotttomWrapper, CalenderWrapper } from './TemperatureStyle';
import Calendar from '../calendar/Calendar';
import BottomSheet from '../bottomsheet/BottomSheet';

const Temperature = ({ navigation }) => {
  return (
    <BackgroundWrapper>
      <CalenderWrapper>
        <Calendar navigation={navigation} />
      </CalenderWrapper>
      <BotttomWrapper>
        <BottomSheet />
      </BotttomWrapper>
    </BackgroundWrapper>
  );
};

export default Temperature;
