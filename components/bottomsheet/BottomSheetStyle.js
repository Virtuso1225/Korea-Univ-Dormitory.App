import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export const BlurBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  /* background-color: rgba(0, 0, 0, 0.3); */
`;

export const BottomModalWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 35%;
  border-radius: 10px;
  background-color: #fefcf9;
  box-shadow: 0 -10px 20px #ded7ca;
`;

export const ModalHeader = styled.View`
  border-bottom-width: 0.4px;
  border-bottom-color: #dadada;
  align-items: center;
  width: 100%;
  flex: 1;
  background-color: #f9f7f4;
  justify-content: center;
`;

export const OptionContainer = styled.View`
  flex: 3.6;
  border-bottom-width: 0.4px;
  border-bottom-color: #dadada;
  background-color: #f9f7f4;
  width: 100%;
  justify-content: center;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  align-self: center;
`;

export const TemperatureInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #cbccce;
  width: ${responsiveScreenWidth(16.8)}px;
  text-align: center;
`;

export const ModalActiveBar = styled.Pressable`
  height: 100%;
  background-color: #f9f7f4;
  align-items: center;
  box-shadow: 0 -10px 10px #ded7ca;
`;

export const SubmitButton = styled.Pressable`
  width: ${responsiveScreenWidth(23)}px;
  height: ${responsiveScreenHeight(4.85)}px;
  background-color: #fffdf9;
  border: 1px solid #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: 30px;
`;

export const OvernightButton = styled.Pressable`
  flex-direction: row;
  width: 90%;
  align-self: center;
  align-items: center;
`;

export const CustomTextMargin = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  color: ${(props) => props.color};
  margin-left: 15px;
  margin-right: 15px;
`;
