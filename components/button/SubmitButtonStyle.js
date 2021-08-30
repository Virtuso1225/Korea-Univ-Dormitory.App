import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const ButtonWrapper = styled.Pressable`
  width: ${responsiveScreenWidth(89.74)}px;
  height: ${responsiveScreenHeight(5.45)}px;
  background-color: #fffdf9;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  margin-top: ${responsiveScreenHeight(7.7)}px;
`;

export default ButtonWrapper;
