import React from 'react';
import { Text } from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import CardComponents from './CardComponents';
import {
  Background,
  Card,
  Header,
  PageTitle,
  ProfileWrapper,
  ProfileContainer,
  ProfileImageContainer,
  ProfileTextContainer,
  CustomText,
  ButtonWrapper,
} from './MypageStyle';

const Mypage = () => {
  return (
    <Background>
      <Card value={1.5}>
        <Header>
          <PageTitle>마이페이지</PageTitle>
        </Header>
        <ProfileWrapper>
          <ProfileContainer>
            <ProfileImageContainer />
            <ProfileTextContainer>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.5)}
                margin={0}
              >
                2020320053
              </CustomText>
              <CustomText
                font="Bold6"
                size={responsiveScreenFontSize(2.26)}
                margin={responsiveScreenHeight(0.8)}
              >
                닉네임
              </CustomText>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.5)}
                margin={responsiveScreenHeight(0.8)}
              >
                구관 남자동 000-0호
              </CustomText>
            </ProfileTextContainer>
          </ProfileContainer>
          <ButtonWrapper>
            <CustomText
              font="Medium"
              size={responsiveScreenFontSize(1.5)}
              margin={0}
            >
              프로필 수정
            </CustomText>
          </ButtonWrapper>
        </ProfileWrapper>
      </Card>
      <Card value={2}>
        <CardComponents />
      </Card>
    </Background>
  );
};

export default Mypage;
