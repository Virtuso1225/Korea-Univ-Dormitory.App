import styled from 'styled-components/native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export const Background = styled.View`
  flex: 1;
  background-color: #fcf8f1;
`;

export const Card = styled.View`
  width: 100%;
  flex: ${(props) => props.value};
  background-color: #f9f7f4;
  box-shadow: 0px 10px 20px rgba(222, 215, 202, 0.37);
  margin-bottom: 11px;
  justify-content: center;
`;

export const Header = styled.View`
  flex: 1;
`;

export const RowWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(6.9)}px;
  width: ${responsiveScreenWidth(87)}px;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

export const PageTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(2.79)}px;
  font-family: Bold6;
  color: black;
`;

export const ProfileWrapper = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

export const ProfileContainer = styled.View`
  width: ${responsiveScreenWidth(90.76)}px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileImageContainer = styled.View`
  border-radius: ${responsiveScreenHeight(3.95)}px;
  background-color: #fefcf9;
`;

export const ProfileTextContainer = styled.View`
  margin-left: ${responsiveScreenWidth(3.84)}px;
  justify-content: center;
`;

export const CustomText = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  margin-top: ${(props) => props.margin}px;
  color: #850000;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: ${responsiveScreenWidth(90.76)}px;
  height: ${responsiveScreenHeight(4.8)}px;
  border: 1px solid #dedede;
  border-radius: 5px;
  margin-top: ${responsiveScreenHeight(4.38)}px;
  justify-content: center;
  align-items: center;
`;
