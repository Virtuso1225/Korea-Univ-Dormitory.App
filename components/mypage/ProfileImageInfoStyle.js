import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
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
  /* border-radius: ${responsiveScreenWidth(15)}px; */
  width: ${responsiveScreenWidth(25)}px;
  height: ${responsiveScreenWidth(25)}px;
  background-color: #fefcf9;
`;

export const ProfileImage = styled.Image`
  width: ${responsiveScreenWidth(25)}px;
  height: ${responsiveScreenWidth(25)}px;
  /* border-radius: ${responsiveScreenWidth(10)}px; */
`;

export const ProfileSelectedImageContainer = styled.View`
  border-radius: ${responsiveScreenWidth(10)}px;
  width: ${responsiveScreenWidth(25)}px;
  height: ${responsiveScreenWidth(25)}px;
  background-color: #fefcf9;
`;

export const ProfileSelectedImage = styled.Image`
  width: ${responsiveScreenWidth(25)}px;
  height: ${responsiveScreenWidth(25)}px;
  border-radius: ${responsiveScreenWidth(10)}px;
  border-color: #850000;
  border-width: 3px;
`;

export const PhotoHeader = styled.View`
  width: ${responsiveScreenWidth(87)}px;
  align-self: center;
  margin-top: ${responsiveScreenWidth(10)}px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${responsiveScreenWidth(5)}px;
  height: ${responsiveScreenWidth(5)}px;
  border-radius: ${responsiveScreenWidth(10)}px;
  background-color: #fefcf9;
  border: 1px #dadada solid;
  justify-content: center;
  align-items: center;
`;

export const ButtonIcon = styled(Icon).attrs(() => ({
  name: 'down',
  size: 20,
  color: '#850000',
}))``;
