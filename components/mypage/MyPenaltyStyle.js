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
  width: ${responsiveScreenWidth(87)}px;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
`;

export const Body = styled.View`
  flex: 6;
  z-index: -1;
`;

export const TableContainer = styled.View`
  margin-top: 40px;
  width: ${responsiveScreenWidth(89.7)}px;
  align-self: center;
  flex: 1.64;
`;

export const TableWrapper = styled.View`
  width: ${responsiveScreenWidth(89.7)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #cbccce;
  border-bottom-width: 0.4px;
  min-height: ${responsiveScreenHeight(5.68)}px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const PenaltyWrapper = styled.View`
  margin-top: ${responsiveScreenHeight(3.9)}px;
  align-self: flex-end;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  width: ${responsiveScreenWidth(89.7)}px;
  align-self: center;
  margin-top: 20px;
`;

export const SmallButton = styled.Pressable`
  width: ${responsiveScreenWidth(43)}px;
  height: ${responsiveScreenHeight(3.9)}px;
  border: 1px solid #ffffff;
  background-color: #fffdf9;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.Text`
  font-family: Regular;
  color: #707070;
  font-size: 10px;
  margin-bottom: 20px;
`;

export const PenatlyRow = styled.View`
  width: ${responsiveScreenWidth(90)}px;
  align-self: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #cbccce;
  border-bottom-width: 0.4px;
  min-height: ${responsiveScreenHeight(5.68)}px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const PenaltyInfoWrapper = styled.View`
  height: 100px;
  align-items: center;
  justify-content: center;
  width: ${responsiveScreenWidth(68)}px;
  margin-left: 10px;
  margin-right: 10px;
`;
