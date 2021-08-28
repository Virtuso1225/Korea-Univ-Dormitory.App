import React from 'react';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import CardComponents from './CardComponents';
import { UserContext } from '../contexts';
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
  RowWrapper,
} from './MypageStyle';
import { ImageSelector } from '../../assets/ProfileImage';

const Mypage = ({ navigation }) => {
  return (
    <UserContext.Consumer>
      {({ profileInfo }) => (
        <Background>
          <Card value={1}>
            <Header>
              <RowWrapper>
                <PageTitle>마이페이지</PageTitle>
              </RowWrapper>
            </Header>
            <ProfileWrapper>
              <ProfileContainer>
                <ProfileImageContainer>
                  {ImageSelector(profileInfo.profileImage)}
                </ProfileImageContainer>
                <ProfileTextContainer>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.5)}
                    margin={0}
                  >
                    {profileInfo.sid}
                  </CustomText>
                  <CustomText
                    font="Bold6"
                    size={responsiveScreenFontSize(2.26)}
                    margin={responsiveScreenHeight(0.8)}
                  >
                    {profileInfo.nickname}
                  </CustomText>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.5)}
                    margin={responsiveScreenHeight(0.8)}
                  >
                    {dorms(profileInfo.dorm)} {profileInfo.room}호
                  </CustomText>
                </ProfileTextContainer>
              </ProfileContainer>
            </ProfileWrapper>
          </Card>
          <Card value={2.05}>
            <CardComponents navigation={navigation} />
          </Card>
        </Background>
      )}
    </UserContext.Consumer>
  );
};

export default Mypage;
