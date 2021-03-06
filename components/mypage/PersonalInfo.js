import React, { useState, useEffect, useContext } from 'react';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext, ProgressContext } from '../contexts';
import { BackgroundWrapper, Body } from './DropOutStyle';
import { getCurrentUser } from '../firebase';
import { dorms } from '../utils';
import {
  LinkWrapper,
  ProfileWrapper,
  ProfileImageContainer,
  ButtonContainer,
  ButtonIcon,
  AlignEnd,
} from './PersonalInfoStyle';
import { ImageSelector } from '../../assets/ProfileImage';
import MypageHeader from '../mypageheader/MypageHeader';
import UserName from '../username/UserName';
import CustomText from '../theme/CustomTextStyle';

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
              <UserName userName={profileInfo.name} />
            </ProfileWrapper>
            <LinkWrapper onPress={() => navigation.navigate('DormInfo')}>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.72)}
                color="#707070"
              >
                소속 동/호실
              </CustomText>
              <AlignEnd>
                <CustomText
                  font="Medium"
                  size={responsiveScreenFontSize(1.72)}
                  color="#850000"
                >
                  {dorms(profileInfo.dorm)} / {profileInfo.room}호
                </CustomText>
              </AlignEnd>
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
              <AlignEnd>
                <CustomText
                  font="Medium"
                  size={responsiveScreenFontSize(1.72)}
                  color="#850000"
                >
                  {profileInfo.nickname}
                </CustomText>
              </AlignEnd>
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
