import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const SubHeader = styled.View`
  width: ${responsiveScreenWidth(89.74)}px;
  align-self: center;
`;

export const SelectionWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(2.93)}px;
  width: ${responsiveScreenWidth(89.74)}px;
  align-self: center;
`;

export const Input = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  padding-left: 10px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.error !== '' ? '#850000' : '#CBCCCE'};
  font-family: Medium;
  padding-bottom: 3px;
`;

export const Input2 = styled.TextInput`
  font-size: ${responsiveScreenFontSize(1.5)}px;
  padding-left: 7px;
  width: ${responsiveScreenWidth(41.7)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.error !== '' ? '#850000' : '#CBCCCE'};
  font-family: Medium;
  padding-bottom: 10px;
`;
