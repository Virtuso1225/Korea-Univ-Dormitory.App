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
  ProfileImage,
} from './MypageStyle';

const Mypage = ({ navigation }) => {
  return (
    <UserContext.Consumer>
      {({ profileInfo, user }) => (
        <Background>
          <Card value={0.7}>
            <Header>
              <RowWrapper>
                <PageTitle>마이페이지</PageTitle>
              </RowWrapper>
            </Header>
            <ProfileWrapper>
              <ProfileContainer>
                <ProfileImageContainer>
                  <ProfileImage
                    source={{
                      uri: 'img',
                    }}
                    alt="no Img"
                  />
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
          <Card value={1}>
            <CardComponents navigation={navigation} />
          </Card>
        </Background>
      )}
    </UserContext.Consumer>
  );
};

export default Mypage;
