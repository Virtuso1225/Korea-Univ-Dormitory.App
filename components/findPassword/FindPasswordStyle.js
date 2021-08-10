import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export const Header = styled.View`
  flex: 0.7;
  margin-top: ${responsiveHeight(10)}px;
`;

export const SubWrapper = styled.View`
  align-self: center;
  margin-top: ${responsiveHeight(5)}px;
  width: ${responsiveScreenWidth(73)}px;
`;

export const IconWrapper = styled.View`
  position: absolute;
  left: 0px;
`;

export const RowWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(6.9)}px;
  width: ${responsiveScreenWidth(87)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  align-self: center;
`;

export const EmailDescription = styled.Text`
  margin-left: 6.5px;
  font-size: ${responsiveScreenFontSize(1.5)}px;
  font-family: Medium;
`;

export const Input = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  width: ${responsiveScreenWidth(60)}px;
  padding-left: 10px;
  height: 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
  font-family: Medium;
`;

export const ErrorText = styled.Text`
  align-items: center;
  align-self: flex-start;
  width: 100%;
  margin-top: 3.5px;
  color: rgba(133, 0, 0, 1);
  font-size: 10px;
  font-family: Regular;
`;
