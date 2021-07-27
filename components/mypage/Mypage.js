import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import CardComponents from './CardComponents';
import { getCurrentUser } from '../firebase';
import { dorms } from '../utils';
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

let isAction = false;

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    dorm: '',
    room: '',
    password: '',
    sid: '',
    nickname: '',
  });

  const setUserInfoFunc1 = async (_callback) => {
    setUserInfo(await getCurrentUser());
    _callback();
  };

  const setUserInfoFunc2 = () => {
    setUserInfoFunc1(function () {});
  };

  while (!isAction) {
    setUserInfoFunc2();
    isAction = true;
  }

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
                {userInfo.sid}
              </CustomText>
              <CustomText
                font="Bold6"
                size={responsiveScreenFontSize(2.26)}
                margin={responsiveScreenHeight(0.8)}
              >
                {userInfo.nickname}
              </CustomText>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.5)}
                margin={responsiveScreenHeight(0.8)}
              >
                {dorms(userInfo.dorm)} {userInfo.room}호
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
