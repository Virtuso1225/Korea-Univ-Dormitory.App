import React, { useState, useEffect, useContext } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext, ProgressContext } from '../contexts';
import {
  BackgroundWrapper,
  Body,
  CloseWrapper,
  RowWrapper,
} from './DropOutStyle';
import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { getCurrentUser } from '../firebase';
import { dorms } from '../utils';
import {
  LinkWrapper,
  ProfileInfoWrapper,
  ProfileWrapper,
  ProfileImageContainer,
} from './PersonalInfoStyle';

const PersonalInfo = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
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
    <BackgroundWrapper>
      <Header>
        <RowWrapper>
          <PageTitle>개인정보 변경하기</PageTitle>
          <CloseWrapper onPress={() => navigation.goBack()}>
            <Close name="close" size={20} color="#707070" />
          </CloseWrapper>
        </RowWrapper>
      </Header>
      <Body>
        <ProfileWrapper>
          <ProfileImageContainer />
          <ProfileInfoWrapper>
            <CustomText
              font="ExtraBold"
              size={responsiveScreenFontSize(1.93)}
              color="#1D1D1D"
            >
              {userInfo.name}
            </CustomText>
            <CustomText
              font="Regular"
              size={responsiveScreenFontSize(1.93)}
              color="#1D1D1D"
            >
              님
            </CustomText>
            <CustomText
              font="ExtraBold"
              size={responsiveScreenFontSize(1.93)}
              color="#1D1D1D"
            >
              {' '}
              계정정보
            </CustomText>
            <CustomText
              font="Regular"
              size={responsiveScreenFontSize(1.93)}
              color="#1D1D1D"
            >
              {' '}
              입니다.
            </CustomText>
          </ProfileInfoWrapper>
        </ProfileWrapper>
        <LinkWrapper onPress={() => navigation.navigate('DormInfo')}>
          <CustomText
            font="Medium"
            size={responsiveScreenFontSize(1.72)}
            color="#707070"
          >
            소속 동/호실
          </CustomText>
          <CustomText
            font="Medium"
            size={responsiveScreenFontSize(1.72)}
            color="#850000"
          >
            {dorms(userInfo.dorm)} / {userInfo.room}호
          </CustomText>
          <Icon name="right" size={14} color="#707070" />
        </LinkWrapper>
        <LinkWrapper onPress={() => navigation.navigate('NicknameInfo')}>
          <CustomText
            font="Medium"
            size={responsiveScreenFontSize(1.72)}
            color="#707070"
          >
            닉네임
          </CustomText>
          <CustomText
            font="Medium"
            size={responsiveScreenFontSize(1.72)}
            color="#850000"
          >
            {userInfo.nickname}
          </CustomText>
          <Icon name="right" size={14} color="#707070" />
        </LinkWrapper>
        <LinkWrapper onPress={() => navigation.navigate('PasswordInfo')}>
          <CustomText
            font="Medium"
            size={responsiveScreenFontSize(1.72)}
            color="#707070"
          >
            비밀번호
          </CustomText>
          <Icon name="right" size={14} color="#707070" />
        </LinkWrapper>
      </Body>
    </BackgroundWrapper>
  );
};

export default PersonalInfo;
