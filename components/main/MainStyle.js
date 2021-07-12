import styled from 'styled-components/native';

export const TitleWrapper = styled.View`
  display: flex;
  border: none;
  align-items: center;
  margin-top: 89px;
`;

export const HeadTitle = styled.Text`
  padding-bottom: 10px;
  font-size: 58px;
  color: rgba(133, 0, 0, 1);
`;

export const SubTitle = styled.Text`
  font-size: 28px;
  color: black;
`;

export const TextArea = styled.View`
  margin-top: 150px;
  width: 302px;
  align-self: center;
`;

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  font-size: 19px;
  margin-left: 15px;
  padding-left: 4px;
  min-width: 80px;
`;

export const CheckWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 9px;
  align-items: flex-start;
`;

export const Check = styled.View`
  display: flex;
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin-right: 11px;
  align-content: center;
  justify-content: center;
`;

export const Description = styled.Text`
  font-size: 14px;
`;

export const BottomWrapper = styled.View`
  display: flex;
  margin-bottom: 50px;
  flex-direction: row;
  align-self: center;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  margin-top: 30px;
  background-color: lightgray;
  border-radius: 12px;
  width: 140px;
  height: 39px;
  margin-right: 10px;
  margin-left: 10px;
  justify-content: center;
`;

export const StyledButton = styled.Text`
  font-size: 15px;
  color: #850000;
`;
