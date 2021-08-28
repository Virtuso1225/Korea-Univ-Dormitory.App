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
  box-shadow: 0px 10px 20px rgba(222, 215, 202, 0.6);
  justify-content: center;
`;

export const Body = styled.View`
  flex: 6;
  z-index: -1;
`;

export const Header = styled.View`
  flex: 1;
`;

export const RowWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(6.9)}px;
  width: ${responsiveScreenWidth(87)}px;
  flex-direction: row;
  align-self: center;
  align-items: center;
`;

export const PageTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(2.15)}px;
  font-family: Bold6;
  color: black;
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

export const ContentWrapper = styled.Pressable`
  width: 100%;
  min-height: ${responsiveScreenHeight(8.86)}px;
  border-bottom-width: 0.4px;
  border-bottom-color: #cbccce;
  justify-content: center;
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  margin-left: 25px;
  width: ${responsiveScreenWidth(63)}px;
  flex-wrap: wrap;
`;

export const IconWrapper = styled.View`
  margin-right: 11px;
  justify-content: center;
`;

export const DateWrapper = styled.View`
  margin-top: 5px;
  margin-left: 55px;
`;

export const Content = styled.View`
  background-color: #f0edeb;
  justify-content: center;
  padding: 23px;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`;
