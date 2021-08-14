import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import Check from 'react-native-vector-icons/Entypo';
import { UserContext, ProgressContext } from '../contexts';
import { SubHeader, SelectionWrapper, ButtonWrapper } from './DormInfoStyle';
import {
  BackgroundWrapper,
  Body,
  RowWrapper,
  CloseWrapper,
} from './DropOutStyle';
import {
  ProfileImageContainer,
  ButtonContainer,
  ProfileWrapper,
} from './ProfileImageInfoStyle';

import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { photoUpdate } from '../firebase';
import { ImageShow } from '../../assets/ProfileImage';

const ProfileImageInfo = ({ navigation }) => {
  const { profileInfo, setProfileInfo } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const _handlePhotoBtnPress = async () => {
    try {
      spinner.start();

      await photoUpdate(myPhoto);
      const profileImage = myPhoto;
      setProfileInfo({ ...profileInfo, profileImage });

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

  const photoArr = [
    { id: 0, isSelected: false },
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
    { id: 5, isSelected: false },
  ];
  const [myPhoto, setMyPhoto] = useState(profileInfo.profileImage);
  const [gallery, setGallery] = useState(
    photoArr.map((element) =>
      element.id === profileInfo.profileImage
        ? { ...element, isSelected: true }
        : { ...element, isSelected: false }
    )
  );
  useEffect(() => {
    setGallery(
      photoArr.map((element) =>
        element.id === myPhoto
          ? { ...element, isSelected: true }
          : { ...element, isSelected: false }
      )
    );
  }, [myPhoto]);

  return (
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
          <ProfileWrapper>
            {photoArr.map((item) => (
              <ProfileImageContainer key={item.id} value={item}>
                {ImageShow(item.id)}
                <ButtonContainer
                  onPress={() => {
                    setMyPhoto(item.id);
                  }}
                >
                  {gallery[item.id].isSelected && (
                    <Check name="check" color="#850000" size={20} />
                  )}
                </ButtonContainer>
              </ProfileImageContainer>
            ))}
          </ProfileWrapper>
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
});
export default ProfileImageInfo;
