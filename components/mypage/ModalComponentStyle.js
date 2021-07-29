import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const CenterView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: ${responsiveScreenWidth(82)}px;
  height: ${responsiveScreenHeight(24.5)}px;
  border-radius: 10px;
  background-color: #fefcf9;
`;

export const CustomText = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  color: ${(props) => props.color};
`;

export const ButtonText = styled.Text`
  margin-left: ${responsiveScreenWidth(4.89)}px;
  font-size: ${responsiveScreenFontSize(1.614)}px;
  color: #404040;
  font-family: Medium;
`;

export const Button = styled.Pressable`
  width: ${responsiveScreenWidth(70)}px;
  height: ${responsiveScreenHeight(4.9)}px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  margin-top: 9px;
  box-shadow: 8px 8px 20px rgba(222, 215, 202, 0.57);
`;

export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${responsiveScreenHeight(4.62)}px;
`;
