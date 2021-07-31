import React, { useState, useEffect, useContext } from 'react';
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
} from './MypageStyle';

const Mypage = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const [userInfo, setUserInfo] = useState({
    dorm: '',
    room: '',
    sid: '',
    nickname: '',
  });

  const setUserInfoFunc = async () => {
    spinner.start();
    setUserInfo(await getCurrentUser());
    spinner.stop();
  };

  useEffect(() => {
    setUserInfoFunc();
  }, [UserContext, ProgressContext]);

  return (
    <Background>
      <Card value={1.5}>
        <Header>
          <PageTitle
            marginTop={responsiveScreenHeight(6.9)}
            marginLeft={responsiveScreenHeight(3)}
          >
            마이페이지
          </PageTitle>
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
        <CardComponents navigation={navigation} />
      </Card>
    </Background>
  );
};

export default Mypage;
