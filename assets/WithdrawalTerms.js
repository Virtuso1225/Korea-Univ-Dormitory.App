import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import CustomText from '../components/theme/CustomTextStyle';

const Guidance = styled.View`
  width: ${responsiveScreenWidth(87)}px;
  height: ${responsiveScreenHeight(17.2)}px;
  margin-top: ${responsiveScreenHeight(2.13)}px;
  border: 1px solid #cbccce;
  border-radius: 10px;
  padding: 9px;
`;

const WithdrawalTerms = () => {
  return (
    <Guidance>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.5)}
        color="#707070"
      >
        [회원 탈퇴 약관]{'\n'}
      </CustomText>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.5)}
        color="#707070"
      >
        회원탈퇴 신청 전 안내 사항을 확인 해 주세요.
      </CustomText>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.5)}
        color="#707070"
      >
        회원탈퇴를 신청하시면 현재 로그인 된 아이디는 사용하실 수 없습니다.
      </CustomText>
      <CustomText
        font="Regular"
        size={responsiveScreenFontSize(1.5)}
        color="#707070"
      >
        회원탈퇴를 하더라도, 서비스 약관 및 개인정보 취급방침 동의하에 따라 일정
        기간동안 회원 개인정보를 보관합니다.
      </CustomText>
    </Guidance>
  );
};

export default WithdrawalTerms;
