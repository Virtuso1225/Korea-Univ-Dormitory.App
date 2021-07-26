import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const Container = styled.View`
  flex: 1;
  background-color: #f9f7f4;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-top: ${responsiveHeight(13)}px;
  width: ${responsiveWidth(77)}px;
  /* border: 1px solid black; */
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const ButtonRowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 20px;
`;

export const Separation = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 19px;
  height: 25px;
`;

export const HeadTitle = styled.Text`
  margin-left: 5px;
  font-size: 28px;
  color: #850000;
  font-family: ${(props) => props.font};
`;

export const SubTitle1 = styled.Text`
  font-size: 15px;
  color: #850000;
  font-family: ${(props) => props.font};
`;

export const ButtonsContainer = styled.View`
  flex: 3;
  width: 324px;
  /* margin-top: 25%; */
  /* border: 1px solid black; */
  align-items: center;
`;

export const DateContainer = styled.View`
  position: absolute;
  top: -15px;
  right: 15px;
`;

export const DateStyle = styled.Text`
  font-size: 11px;
  font-family: ExtraLight;
  color: #484848;
`;

export const Temperature = styled.Text`
  color: #484848;
  font-size: 14px;
  font-weight: bold;
  font-family: Bold6;
  margin-top: ${responsiveHeight(0.5)}px;
`;
export const ButtonWrapper = styled.TouchableOpacity`
  margin-top: ${responsiveHeight(5)}px;
  background-color: #f9f7f4;
  border-radius: 10px;
  width: ${responsiveWidth(83)}px;
  height: ${responsiveHeight(8)}px;
  justify-content: center;
`;

export const StyledButton = styled.Text`
  font-size: 16px;
  color: #850000;
  font-family: Bold6;
  font-weight: bold;
  margin-left: 18px;
`;

export const CharacterContainer = styled.View`
  position: absolute;
  top: -46px;
  left: 0px;
  z-index: 1;
`;
