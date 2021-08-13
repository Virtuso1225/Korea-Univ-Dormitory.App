import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const ProfileWrapper = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: ${responsiveScreenWidth(79.8)}px;
  align-self: center;
  margin-top: ${responsiveScreenHeight(5.92)}px;
  margin-bottom: 30px;
`;

export const ProfileImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: ${responsiveScreenWidth(25)}px;
  height: ${responsiveScreenWidth(25)}px;
  /* border-radius: ${responsiveScreenWidth(10)}px; */
`;

export const ButtonContainer = styled.Pressable`
  width: ${responsiveScreenWidth(5.89)}px;
  height: ${responsiveScreenWidth(5.89)}px;
  border-radius: ${responsiveScreenWidth(2)}px;
  border: 1px solid rgba(133, 0, 0, 0.17);
  justify-content: center;
  align-items: center;
  margin-top: 11px;
  margin-bottom: 30px;
`;
