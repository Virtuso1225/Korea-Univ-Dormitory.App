import React from 'react';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ProfileInfoWrapper } from '../mypage/PersonalInfoStyle';
import CustomText from '../theme/CustomTextStyle';

const UserName = ({ userName }) => {
  return (
    <ProfileInfoWrapper>
      <CustomText
        font="ExtraBold"
        size={responsiveScreenFontSize(1.93)}
        color="#1D1D1D"
      >
        {userName}
      </CustomText>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.93)}
        color="#1D1D1D"
      >
        님{' '}
      </CustomText>
      <CustomText
        font="ExtraBold"
        size={responsiveScreenFontSize(1.93)}
        color="#1D1D1D"
      >
        계정정보
      </CustomText>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.93)}
        color="#1D1D1D"
      >
        입니다.
      </CustomText>
    </ProfileInfoWrapper>
  );
};

export default UserName;
