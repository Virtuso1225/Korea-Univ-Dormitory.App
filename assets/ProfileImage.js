import React from 'react';
import {
  AlcoholIcon,
  AlcoholStanding,
  BasicIconOne,
  BasicIconTwo,
  BasicOneStanding,
  BasicTwoStanding,
  ExerciseIcon,
  ExerciseStanding,
  SleepingIcon,
  StudyIcon,
  StudyStanding,
  SleepStanding,
} from './Svgs';

export const ImageSelector = (index) => {
  switch (index) {
    case 0:
      return <BasicIconOne />;
    case 1:
      return <BasicIconTwo />;
    case 2:
      return <ExerciseIcon />;
    case 3:
      return <StudyIcon />;
    case 4:
      return <AlcoholIcon />;
    case 5:
      return <SleepingIcon />;
    default:
      return <BasicIconOne />;
  }
};

export const ImageShow = (index) => {
  switch (index) {
    case 0:
      return <BasicOneStanding />;
    case 1:
      return <BasicTwoStanding />;
    case 2:
      return <ExerciseStanding />;
    case 3:
      return <StudyStanding />;
    case 4:
      return <AlcoholStanding />;
    case 5:
      return <SleepStanding />;
    default:
      return <BasicOneStanding />;
  }
};
