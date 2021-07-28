import styled from 'styled-components/native';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const ColumnWrapper = styled.View`
  width: ${responsiveScreenWidth(90)}px;
  align-self: center;
  /* border: 1px solid black; */
`;

export const TopRowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const RowWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${responsiveScreenHeight(4.62)}px;
`;

export const ButtonText = styled.Text`
  margin-left: ${responsiveScreenWidth(4.89)}px;
  font-size: ${responsiveScreenFontSize(1.614)}px;
  color: #404040;
  font-family: Medium;
`;

export const ErrorText = styled.Text`
  font-size: ${responsiveScreenFontSize(1.29)}px;
  font-family: Bold6;
  color: #ff0000;
  margin-left: 5px;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`;

export const DescriptionText = styled.Text``;
