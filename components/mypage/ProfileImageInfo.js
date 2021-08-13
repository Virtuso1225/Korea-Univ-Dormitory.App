import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import { UserContext, ProgressContext } from '../contexts';
import {
  SubHeader,
  SelectionWrapper,
  ButtonWrapper,
  Input,
} from './DormInfoStyle';
import {
  BackgroundWrapper,
  Body,
  RowWrapper,
  CloseWrapper,
} from './DropOutStyle';
import {
  ProfileSelectedImage,
  PhotoHeader,
  ProfileSelectedImageContainer,
  ProfileImage,
  ProfileImageContainer,
  ButtonContainer,
  ButtonIcon,
} from './ProfileImageInfoStyle';

import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { photoUpdate } from '../firebase';

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const ProfileImageInfo = ({ navigation }) => {
  const { profileInfo, setProfileInfo } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const _handlePhotoBtnPress = async () => {
    try {
      spinner.start();
      const curUser = await photoUpdate(myPhoto);
      setProfileInfo(curUser);
      console.log(curUser);
      Alert.alert('Success!', '정보 업데이트에 성공했습니다.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      Alert.alert('프로필 이미지 변경 에러', e.message);
    } finally {
      spinner.stop();
    }
  };

  const photoArr = [0, 1, 2, 3, 4];

  const [myPhoto, setMyPhoto] = useState(profileInfo.profileImage);
  const [gallery, setGallery] = useState(
    photoArr.filter((element) => element !== profileInfo.profileImage)
  );

  useEffect(() => {
    setGallery(photoArr.filter((element) => element !== myPhoto));
  }, [myPhoto]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <Header>
          <RowWrapper>
            <PageTitle>프로필 이미지 변경</PageTitle>
            <CloseWrapper onPress={() => navigation.goBack()}>
              <Close name="close" size={20} color="#707070" />
            </CloseWrapper>
          </RowWrapper>
        </Header>
        <Body>
          <SelectionWrapper>
            <SubHeader>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                안암학사 어플 프로필을 설정해주세요.
              </CustomText>
            </SubHeader>
            <PhotoHeader>
              <CustomText
                font="ExtraBold"
                size={responsiveScreenFontSize(2)}
                color="rgba(133, 0, 0, 1)"
              >
                현재 사진
              </CustomText>
            </PhotoHeader>
            <RowWrapper>
              <ProfileSelectedImageContainer>
                <ProfileSelectedImage
                  source={{
                    uri: 'img',
                  }}
                  alt="no IMG"
                />
              </ProfileSelectedImageContainer>
            </RowWrapper>

            <RowWrapper>
              <ProfileImageContainer>
                <ProfileImage
                  source={{
                    uri: 'img',
                  }}
                  alt="no IMG"
                />
                <PhotoButton onPress={() => setMyPhoto(gallery[0])} />
              </ProfileImageContainer>
              <ProfileImageContainer>
                <ProfileImage
                  source={{
                    uri: 'img',
                  }}
                  alt="no IMG"
                />
                <PhotoButton onPress={() => setMyPhoto(gallery[1])} />
              </ProfileImageContainer>
              <ProfileImageContainer>
                <ProfileImage
                  source={{
                    uri: 'img',
                  }}
                  alt="no IMG"
                />
                <PhotoButton onPress={() => setMyPhoto(gallery[2])} />
              </ProfileImageContainer>
            </RowWrapper>

            <View style={styles.topShadow}>
              <View style={styles.bottomShadow}>
                <ButtonWrapper onPress={_handlePhotoBtnPress}>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.8)}
                    color="#1D1D1D"
                  >
                    완료
                  </CustomText>
                </ButtonWrapper>
              </View>
            </View>
          </SelectionWrapper>
        </Body>
      </BackgroundWrapper>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#ffffff',
  },
  bottomShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#d4d2cf',
  },
  buttonStyle: {
    width: 143,
    height: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(133, 0, 0, 0.15)',
    backgroundColor: '#f9f7f4',
  },
  buttonTextStyle: {
    fontSize: responsiveScreenFontSize(1.5),
    width: 143,
    textAlign: 'left',
    color: '#8E8E8E',
    fontFamily: 'Medium',
  },
  dropdownStyle: {
    backgroundColor: '#f9f7f4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rowStyle: {
    backgroundColor: '#f9f7f4',
  },
  rowTextStyle: {
    fontSize: 12,
    color: '#8E8E8E',
  },
});
export default ProfileImageInfo;
