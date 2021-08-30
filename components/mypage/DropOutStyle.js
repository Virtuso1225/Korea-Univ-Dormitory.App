import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const CloseWrapper = styled.Pressable`
  align-items: center;
  justify-content: center;
`;

export const RowWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(6.9)}px;
  width: ${responsiveScreenWidth(89.74)}px;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

export const BackgroundWrapper = styled.View`
  flex: 1;
  background-color: #f9f7f4;
`;

export const Body = styled.View`
  flex: 7.5;
`;

export const GuidanceWrapper = styled.View`
  width: ${responsiveScreenWidth(87)}px;
  margin-top: ${responsiveScreenHeight(3.17)}px;
  align-self: center;
`;

export const CheckWrapper = styled.View`
  flex-direction: row;
  margin-top: ${responsiveScreenHeight(1.42)}px;
  align-items: center;
  justify-content: flex-end;
`;

export const Check = styled.Pressable`
  width: 21px;
  height: 21px;
  border: 1.5px solid #cbccce;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;

export const PasswordCheck = styled.View`
  margin-top: ${responsiveScreenHeight(7.2)}px;
  width: ${responsiveScreenWidth(87)}px;
  align-self: center;
`;

export const Password = styled.TextInput`
  margin-top: ${responsiveScreenHeight(3.5)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.different ? '#850000' : '#cbccce')};
  font-family: Regular;
  font-size: ${responsiveScreenFontSize(1.6)}px;
  padding-bottom: 2px;
  margin-bottom: 8px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: ${responsiveScreenWidth(87)}px;
  height: ${responsiveScreenHeight(5.45)}px;
  background-color: #fffdf9;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  margin-top: ${responsiveScreenHeight(22.9)}px;
`;

export const ErrorText = styled.Text`
  align-items: center;
  align-self: center;
  width: 100%;
  margin-top: 3.5px;
  color: rgba(133, 0, 0, 1);
  font-size: 10px;
  font-family: Regular;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`;
