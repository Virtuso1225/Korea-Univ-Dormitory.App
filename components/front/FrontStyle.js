import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const TitleWrapper = styled.View`
  flex: 2;
  border: none;
  align-items: flex-start;
`;

export const HeadTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(4.95)}px;
  color: rgba(133, 0, 0, 1);
  font-family: Light;
`;

export const Separate = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${responsiveHeight(17)}px;
`;

export const Titles = styled.View`
  margin-left: 5px;
  align-items: center;
`;

export const SubTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(4.95)}px;
  color: rgba(133, 0, 0, 1);
  font-family: ExtraBold;
`;

export const Greeting = styled.Text`
  font-size: 15px;
  color: rgba(133, 0, 0, 1);
  font-family: Regular;
  margin-top: 8px;
`;

export const Logo = styled.Image`
  width: 27px;
  height: 35px;
`;

export const TextArea = styled.View`
  align-self: center;
`;

export const ErrorText = styled.Text`
  align-items: center;
  align-self: center;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 20px;
  color: rgba(133, 0, 0, 1);
`;

export const TextWrapper = styled.View`
  justify-content: space-around;
  align-self: center;
  padding: 3px 10px 3px 10px;
  margin-top: 29px;
  max-width: 301px;
  height: 54px;
  border-bottom-width: 1.5px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  border: none;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  font-size: 14px;
  padding-left: 10px;
  width: 300px;
  height: 50px;
  font-family: Regular;
`;

// export const EyeIconWrapper = styled.View``;

export const CheckWrapper = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const Check = styled.View`
  width: 29px;
  height: 29px;
  border: 1.5px solid rgba(133, 0, 0, 0.15);
  border-radius: 8px;
  margin-right: 11px;
  align-content: center;
  justify-content: center;
`;

export const Description = styled.Text`
  font-size: 13px;
  font-family: Medium;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: center;
  margin-top: ${responsiveHeight(5.8)}px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  background-color: #f9f7f4;
  border-radius: 10px;
  width: 140px;
  height: 39px;
  margin-right: 10px;
  margin-left: 10px;
  justify-content: center;
  /* box-shadow: 5px 5px 8px rgba(15, 41, 107, 0.15); */
`;

export const StyledButton = styled.Text`
  font-size: 15px;
  color: #850000;
  font-family: Bold6;
`;
