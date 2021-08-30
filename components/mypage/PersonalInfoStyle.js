import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';

export const LinkWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: ${responsiveScreenWidth(89.74)}px;
  align-self: center;
  justify-content: space-between;
  margin-top: ${responsiveScreenHeight(3.4)}px;
`;

export const AlignEnd = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: ${responsiveScreenWidth(51.7)}px;
  position: absolute;
  right: 40px;
`;

export const ProfileWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: ${responsiveScreenHeight(3.64)}px;
`;

export const ProfileImageContainer = styled.View`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;

export const ProfileInfoWrapper = styled.View`
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: ${responsiveScreenHeight(6)}px;
`;

export const ButtonContainer = styled.Pressable`
  background-color: #ffffff;
  position: absolute;
  bottom: -5px;
  right: 2px;
  width: ${responsiveScreenWidth(7)}px;
  height: ${responsiveScreenWidth(7)}px;
  border-radius: 13px;
  border: 1px solid #dadada;
  justify-content: center;
  align-items: center;
`;
export const ButtonIcon = styled(Icon).attrs(() => ({
  name: 'plus',
  size: 20,
  color: '#850000',
}))``;
