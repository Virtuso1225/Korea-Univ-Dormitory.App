import styled from 'styled-components/native';

export const Wrapper = styled.View`
  align-items: center;
`;

export const TitleWrapper = styled.View`
  flex: 0.7;
  margin-top: 103px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 29px;
  color: #850000;
`;

export const SubWrapper = styled.View`
  flex: 4;
  align-self: center;
`;

export const InputWrapper = styled.View`
  align-self: center;
  margin-top: 15px;
  width: 301px;
  height: 54px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(15, 41, 107, 0.22);
  background-color: #ecedf2;
  justify-content: center;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  margin-left: 20px;
  padding-left: 10px;
  min-width: 150px;
  min-height: 25px;
`;

export const BottomWrapper = styled.View`
  flex: 1.7;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  background-color: rgba(133, 0, 0, 0.84);
  border-radius: 10px;
  width: 302px;
  height: 50px;
  justify-content: center;
  box-shadow: 10px 10px 30px rgba(15, 41, 107, 0.12);
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

export const Option = styled.Text`
  margin-left: 3px;
  font-size: 14px;
  color: #850000;
`;
