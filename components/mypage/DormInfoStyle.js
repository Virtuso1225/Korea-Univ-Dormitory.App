import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const SubHeader = styled.View`
  width: ${responsiveScreenWidth(87)}px;
  align-self: center;
`;

export const SelectionWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(2.66)}px;
  width: ${responsiveScreenWidth(80)}px;
  align-self: center;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: ${responsiveScreenWidth(87)}px;
  height: ${responsiveScreenHeight(5.45)}px;
  background-color: #fffdf9;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  margin-top: ${responsiveScreenHeight(7.7)}px;
`;

export const Input = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  padding-left: 10px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
  font-family: Medium;
  padding-bottom: 3px;
`;
