import React, { useState, useEffect } from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import CardComponents from './CardComponents';
import { UserContext, ProgressContext } from '../contexts';
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
  RowWrapper,
} from './MypageStyle';

const Mypage = ({ navigation }) => {
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
    console.log('hi');
  };

  const setUserInfoFunc2 = () => {
    setUserInfoFunc1(function () {});
  };

  useEffect(() => {
    setUserInfoFunc2();
  }, [UserContext, ProgressContext]);

  return (
    <Background>
      <Card value={0.7}>
        <Header>
          <RowWrapper>
            <PageTitle>마이페이지</PageTitle>
          </RowWrapper>
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
          {/* <ButtonWrapper>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.5)}
                margin={0}
              >
                프로필 수정
              </CustomText>
            </ButtonWrapper> */}
        </ProfileWrapper>
      </Card>
      <Card value={1}>
        <CardComponents navigation={navigation} />
      </Card>
    </Background>
  );
};

export default Mypage;
