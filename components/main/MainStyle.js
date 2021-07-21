import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #f9f7f4;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: flex-start;
  margin-top: 30%;
  /* border: 1px solid black; */
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
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
`;

export const Logo = styled.Image`
  width: 19px;
  height: 25px;
`;

export const HeadTitle = styled.Text`
  margin-left: 5px;
  font-size: 30px;
  color: #850000;
`;

export const SubTitle1 = styled.Text`
  font-size: 28px;
  color: #850000;
  font-family: NanumGothicCoding_700Bold;
  font-weight: bold;
`;

export const SubTitle2 = styled.Text`
  font-size: 28px;
  color: #850000;
`;

export const ButtonsContainer = styled.View`
  width: 324px;
  margin-top: 25%;
  /* border: 1px solid black; */
  align-items: center;
`;

export const DateContainer = styled.View`
  position: absolute;
  top: -15px;
  right: 30px;
`;

export const DateStyle = styled.Text`
  font-size: 11px;
  font-family: NotoSansKR_400Regular;
  font-weight: 400;
  color: #484848;
`;

export const Temperature = styled.Text`
  color: #484848;
  font-size: 14px;
  font-weight: bold;
  font-family: NotoSansKR_700Bold;
`;
export const ButtonWrapper = styled.TouchableOpacity`
  margin-top: 14%;
  background-color: #f9f7f4;
  border-radius: 10px;
  width: 310px;
  height: 55px;
  justify-content: center;
`;

export const StyledButton = styled.Text`
  font-size: 16px;
  color: #850000;
  font-family: NotoSansKR_700Bold;
  font-weight: bold;
  margin-left: 18px;
`;

export const CharacterContainer = styled.View`
  position: absolute;
  top: -43px;
  left: 0px;
  z-index: 1;
`;
