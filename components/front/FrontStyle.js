import styled from 'styled-components/native';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

export const BackgroundWrapper = styled.View`
  flex: 1;
  background-color: #f9f7f4;
`;

export const TitleWrapper = styled.View`
  flex: 2.6;
  width: ${responsiveScreenWidth(89.74)}px;
  align-self: center;
`;

export const HeadTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(4.73)}px;
  color: rgba(133, 0, 0, 1);
  font-family: Regular;
`;

export const Separate = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${responsiveHeight(26.3)}px;
`;

export const Titles = styled.View`
  margin-left: 2px;
  align-items: center;
`;

export const SubTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(6.88)}px;
  color: rgba(133, 0, 0, 1);
  font-family: ExtraBold;
  margin-bottom: ${responsiveScreenHeight(2.08)}px;
`;

export const Greeting = styled.Text`
  font-size: 13px;
  color: rgba(133, 0, 0, 1);
  font-family: Medium;
  margin-top: ${responsiveScreenHeight(1.58)}px;
`;

export const Logo = styled.Image`
  width: 27px;
  height: 35px;
`;

export const TextArea = styled.View`
  align-self: center;
  width: ${responsiveScreenWidth(89.74)}px;
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
  margin-top: 29px;
  width: ${responsiveScreenWidth(89.74)}px;
  height: 54px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  border: none;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  font-size: 14px;
  margin-top: ${responsiveScreenHeight(4.38)}px;
  padding-left: 10px;
  width: ${responsiveScreenWidth(89.74)}px;
  font-family: Medium;
  border-bottom-width: 1px;
  border-bottom-color: rgba(133, 0, 0, 0.1);
  padding-bottom: 11px;
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
  flex: 1.3;
  align-self: center;
`;

export const ButtonWrapper = styled.Pressable`
  align-items: center;
  background-color: #f9f7f4;
  border-radius: 10px;
  width: ${responsiveScreenWidth(89.74)}px;
  height: ${responsiveScreenHeight(5.4)}px;
  margin-top: ${responsiveScreenHeight(6)}px;
  justify-content: center;
`;

export const StyledButton = styled.Text`
  font-size: ${responsiveScreenFontSize(2)}px;
  color: #850000;
  font-family: Medium;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${responsiveScreenHeight(3.19)}px;
  width: 50%;
  align-self: center;
`;
