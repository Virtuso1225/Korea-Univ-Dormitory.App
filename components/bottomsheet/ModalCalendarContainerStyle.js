import styled from 'styled-components/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export const CalendarModalWrapper = styled.View`
  align-items: center;
  width: 100%;
  height: 60%;
  background-color: #fefcf9;
  box-shadow: 0 -10px 20px #ded7ca;
  border-radius: 20px;
`;

export const OptionHeader = styled.View`
  margin: 21px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const OptionButton = styled.Pressable`
  width: ${responsiveScreenWidth(40)}px;
  height: ${responsiveScreenHeight(9)}px;
  background-color: #fffdf9;
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding-left: 14px;
  justify-content: center;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  margin-top: 3px;
`;

export const ColumnWrapper = styled.View`
  margin-left: 8px;
`;

export const SubmitWrapper = styled.View`
  flex-direction: row;
  align-self: flex-end;
`;

export const ButtonWrapper = styled.Pressable`
  margin-right: 30px;
`;
