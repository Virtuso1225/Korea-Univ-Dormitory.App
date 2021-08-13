import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';

export const LinkWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${responsiveScreenWidth(87)}px;
  align-self: center;
  justify-content: space-between;
  margin-top: ${responsiveScreenHeight(3.4)}px;
`;

export const ProfileWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: ${responsiveScreenHeight(3.4)}px;
`;

export const ProfileImageContainer = styled.View`
  width: ${responsiveScreenWidth(20)}px;
  height: ${responsiveScreenWidth(20)}px;
`;

export const ProfileImage = styled.ImageBackground`
  z-index: 0;
  position: absolute;
`;

export const ProfileInfoWrapper = styled.View`
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: ${responsiveScreenHeight(6)}px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  right: -8px;
  width: ${responsiveScreenWidth(7.69)}px;
  height: ${responsiveScreenWidth(7.69)}px;
  border-radius: 15px;
  border: 1px solid #dadada;
  justify-content: center;
  align-items: center;
`;
export const ButtonIcon = styled(Icon).attrs(() => ({
  name: 'plus',
  size: 20,
  color: '#850000',
}))``;
