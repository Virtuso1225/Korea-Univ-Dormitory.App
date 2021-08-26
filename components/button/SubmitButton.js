import React from 'react';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import CustomText from '../theme/CustomTextStyle';
import ShadowGenerator from '../theme/ShadowGenerator';
import ButtonWrapper from './SubmitButtonStyle';

const SubmitButton = ({ handler }) => {
  return (
    <ShadowGenerator>
      <ButtonWrapper onPress={handler}>
        <CustomText
          font="Medium"
          size={responsiveScreenFontSize(1.8)}
          color="#1D1D1D"
        >
          완료
        </CustomText>
      </ButtonWrapper>
    </ShadowGenerator>
  );
};

export default SubmitButton;
