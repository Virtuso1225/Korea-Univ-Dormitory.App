import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

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
  border-radius: ${responsiveScreenWidth(10)}px;
  width: ${responsiveScreenWidth(20)}px;
  height: ${responsiveScreenWidth(20)}px;
  border: 3px solid #850000;
`;

export const ProfileInfoWrapper = styled.View`
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: ${responsiveScreenHeight(6)}px;
`;
