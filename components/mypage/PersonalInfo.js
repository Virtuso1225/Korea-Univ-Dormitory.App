import React, { useState, useEffect, useContext } from 'react';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext, ProgressContext } from '../contexts';
import { BackgroundWrapper, Body } from './DropOutStyle';
import { CustomText } from './ModalComponentStyle';
import { getCurrentUser } from '../firebase';
import { dorms } from '../utils';
import {
  LinkWrapper,
  ProfileInfoWrapper,
  ProfileWrapper,
  ProfileImageContainer,
  ButtonContainer,
  ButtonIcon,
} from './PersonalInfoStyle';
import { ImageSelector } from '../../assets/ProfileImage';
import MypageHeader from '../mypageheader/MypageHeader';

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

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
    const unsubscribe = navigation.addListener('focus', () => {
      spinner.start();
      setUserInfoFunc();
      spinner.stop();
    });

    return unsubscribe;
  }, [navigation]);

  const closeHandler = () => {
    navigation.goBack();
  };
  return (
    <UserContext.Consumer>
      {({ profileInfo }) => (
        <BackgroundWrapper>
          <MypageHeader pageInfo="개인정보 변경하기" handler={closeHandler} />
          <Body>
            <ProfileWrapper>
              <ProfileImageContainer>
                {ImageSelector(profileInfo.profileImage)}
                <PhotoButton
                  onPress={() => navigation.navigate('ProfileImageInfo')}
                />
              </ProfileImageContainer>

              <ProfileInfoWrapper>
                <CustomText
                  font="ExtraBold"
                  size={responsiveScreenFontSize(1.93)}
                  color="#404040"
                >
                  {profileInfo.name}
                </CustomText>
                <CustomText
                  font="Regular"
                  size={responsiveScreenFontSize(1.93)}
                  color="#404040"
                >
                  님{' '}
                </CustomText>
                <CustomText
                  font="ExtraBold"
                  size={responsiveScreenFontSize(1.93)}
                  color="#404040"
                >
                  계정정보
                </CustomText>
                <CustomText
                  font="Regular"
                  size={responsiveScreenFontSize(1.93)}
                  color="#404040"
                >
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
                {dorms(profileInfo.dorm)} / {profileInfo.room}호
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
                {profileInfo.nickname}
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
      )}
    </UserContext.Consumer>
  );
};
export default PersonalInfo;
