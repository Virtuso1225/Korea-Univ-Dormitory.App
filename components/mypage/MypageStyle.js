import styled from 'styled-components/native';
import {
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
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
`;

export const PageTitle = styled.Text`
  margin-top: ${responsiveScreenHeight(6.9)}px;
  margin-left: ${responsiveScreenHeight(3)}px;
  font-size: 20px;
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
  /* border: 1px solid black; */
  flex-direction: row;
`;

export const ProfileImageContainer = styled.View`
  border-radius: ${responsiveScreenHeight(3.95)}px;
  width: ${responsiveScreenHeight(7.9)}px;
  height: ${responsiveScreenHeight(7.9)}px;
  border: 3px solid #850000;
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
