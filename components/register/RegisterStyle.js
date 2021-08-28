import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export const Header = styled.View`
  flex: 1;
  margin-top: ${responsiveHeight(10)}px;
  flex-direction: row;
  align-items: center;
  width: ${responsiveScreenWidth(89.74)}px;
`;

export const Title = styled.Text`
  font-size: ${responsiveScreenFontSize(2.15)}px;
  color: #850000;
  font-family: ExtraBold;
`;

export const SubWrapper = styled.View`
  flex: 3;
  align-self: center;
  margin-top: ${responsiveScreenHeight(6.39)}px;
`;

export const InputWrapper = styled.View`
  align-self: center;
  width: ${responsiveScreenWidth(89.74)}px;
  justify-content: center;
`;

export const RowWrapper = styled.View`
  width: ${responsiveScreenWidth(89.74)}px;
  flex-direction: row;
  align-items: center;
`;

export const EmailDescription = styled.Text`
  margin-left: 6.5px;
  font-size: ${responsiveScreenFontSize(1.5)}px;
  font-family: Medium;
`;

export const Input = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  padding-left: 7px;
  min-width: 204px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.1);
  font-family: Medium;
  padding-bottom: 10px;
`;

export const Input2 = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  padding-left: 7px;
  width: ${responsiveScreenWidth(41.7)}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
  font-family: Medium;
  padding-bottom: 10px;
`;

export const BottomWrapper = styled.View`
  align-items: center;
  margin-bottom: ${responsiveScreenHeight(11.1)}px;
`;

export const OptionWrapper = styled.View`
  margin-top: 16px;
  flex-direction: row;
`;

export const OptionDescription = styled.Text`
  font-size: 13px;
  font-family: Medium;
  color: #515151;
`;

export const OptionButton = styled.Text`
  font-size: 13px;
  font-family: Bold6;
  color: #850000;
`;

export const ErrorText = styled.Text`
  align-items: center;
  align-self: flex-start;
  width: 100%;
  margin-top: 3.5px;
  color: rgba(133, 0, 0, 1);
  font-size: 10px;
  font-family: Regular;
  margin-bottom: ${responsiveScreenHeight(2)}px;
`;

export const ColumnWrapper = styled.View`
  margin-top: ${responsiveHeight(1)}px;
`;

export const RoomWrapper = styled.View`
  margin-top: ${responsiveHeight(1)}px;
  margin-left: 23px;
`;
