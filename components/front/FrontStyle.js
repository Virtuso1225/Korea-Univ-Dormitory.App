import styled from 'styled-components/native';

export const TitleWrapper = styled.View`
  flex: 2;
  border: none;
  align-items: center;
`;

export const HeadTitle = styled.Text`
  margin-top: 89px;
  font-size: 58px;
  color: rgba(133, 0, 0, 1);
`;

export const Separate = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Titles = styled.View`
  margin-left: 5px;
  align-items: center;
`;

export const SubTitle = styled.Text`
  font-size: 28px;
  color: rgba(133, 0, 0, 1);
`;

export const EngSub = styled.Text`
  font-size: 10px;
  color: rgba(133, 0, 0, 1);
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
  /* border-radius: 10px; */
  /* box-shadow: 2px 2px 5px #d4d2cf; */
  /* background-color: #f9f7f4; */
  border-bottom-width: 1.5px;
  border-bottom-color: rgba(133, 0, 0, 0.15);
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  border: none;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  font-size: 19px;
  /* margin-left: 10px; */
  padding-left: 10px;
  width: 300px;
  height: 50px;
`;

export const EyeIconWrapper = styled.View``;

export const CheckWrapper = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const Check = styled.View`
  display: flex;
  /* background-color: #f9f7f4; */
  /* box-shadow: 2px 2px 5px #d4d2cf; */
  width: 29px;
  height: 29px;
  border: 1.5px solid rgba(133, 0, 0, 0.15);
  border-radius: 5px;
  margin-right: 11px;
  align-content: center;
  justify-content: center;
`;

export const Description = styled.Text`
  font-size: 14px;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-self: center;
`;

export const TopShadow = styled.View`
  box-shadow: -11px -11px 22px #ffffff; ;
`;

export const BottomShadow = styled.View`
  box-shadow: 6px 6px 12px #d4d2cf;
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
`;
