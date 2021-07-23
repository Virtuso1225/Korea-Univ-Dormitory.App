import styled from 'styled-components/native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const Header = styled.View`
  flex: 0.7;
  margin-top: 25%;
`;

export const IconWrapper = styled.View``;

export const Title = styled.Text`
  font-size: 28px;
  color: #850000;
  font-family: ExtraBold;
  margin-top: ${responsiveHeight(3)}px;
`;

export const SubWrapper = styled.View`
  flex: 3;
  align-self: center;
  margin-top: ${responsiveHeight(5)}px;
`;

export const InputWrapper = styled.View`
  align-self: center;
  margin-top: ${responsiveHeight(1)}px;
  width: 301px;
  height: 39px;
  justify-content: center;
  /* border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15); */
`;

export const RowWrapper = styled.View`
  align-self: center;
  margin-top: ${responsiveHeight(1)}px;
  width: 301px;
  height: 39px;
  flex-direction: row;
  align-items: center;
`;

export const EmailDescription = styled.Text`
  margin-left: 6.5px;
  font-size: 12px;
`;
export const Input = styled.TextInput`
  font-size: 12px;
  padding-left: 10px;
  min-width: 204px;
  /* min-width: 150px;
  min-height: 25px; */
  height: 20px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
`;

export const Input2 = styled.TextInput`
  font-size: 12px;
  padding-left: 10px;
  width: 143px;
  margin-left: 5px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
`;

export const BottomWrapper = styled.View`
  flex: 1.5;
  align-items: center;
  margin-top: ${responsiveHeight(6)}px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  background-color: rgba(133, 0, 0, 0.84);
  border-radius: 10px;
  width: 302px;
  height: 50px;
  justify-content: center;
  box-shadow: 1.5px 1.5px 3px #7e0000;
`;

export const StyledButton = styled.Text`
  padding-left: 2.5px;
  padding-right: 2.5px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  font-size: 15px;
  color: white;
  font-size: 20px;
`;

export const OptionWrapper = styled.View`
  margin-top: 40px;
  flex-direction: row;
`;

export const OptionDescription = styled.Text`
  font-size: 14px;
  color: #6a6a6a;
`;

export const OptionButton = styled.Text`
  font-size: 15px;
  color: #850000;
`;

export const Option = styled.Text`
  margin-left: 3px;
  font-size: 14px;
  color: #850000;
`;

export const ErrorText = styled.Text`
  align-items: center;
  align-self: center;
  width: 100%;
  margin-top: 3.5px;
  color: rgba(133, 0, 0, 1);
  font-size: 10px;
`;
