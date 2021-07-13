import styled from 'styled-components/native';

export const TitleWrapper = styled.View`
  flex: 2;
  border: none;
  align-items: center;
`;

export const HeadTitle = styled.Text`
  margin-top: 89px;
  padding-bottom: 10px;
  font-size: 58px;
  color: rgba(133, 0, 0, 1);
`;

export const SubTitle = styled.Text`
  font-size: 28px;
  color: rgba(133, 0, 0, 1);
`;

export const EngSub = styled.Text`
  font-size: 10px;
  color: rgba(133, 0, 0, 1);
`;

export const TextArea = styled.View`
  flex: 1.5;
  align-self: center;
`;

export const TextWrapper = styled.View`
  justify-content: space-around;
  align-self: center;
  padding: 3px 10px 3px 10px;
  margin-top: 29px;
  min-width: 301px;
  height: 54px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(15, 41, 107, 0.22);
  background-color: #ecedf2;
`;

export const Input = styled.TextInput`
  font-size: 19px;
  margin-left: 15px;
  padding-left: 4px;
  min-width: 80px;
`;

export const CheckWrapper = styled.View`
  flex-direction: row;
  margin-top: 9px;
  align-items: center;
`;

export const Check = styled.View`
  display: flex;
  background-color: #ecedf2;
  box-shadow: 2px 2px 5px rgba(15, 41, 107, 0.22);
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
  flex: 1;
  flex-direction: row;
  align-self: center;
`;

export const ButtonWrapper = styled.View`
  align-items: center;
  background-color: #ecedf2;
  border-radius: 10px;
  width: 140px;
  height: 39px;
  margin-right: 10px;
  margin-left: 10px;
  justify-content: center;
  box-shadow: 5px 5px 8px rgba(15, 41, 107, 0.22);
`;

export const StyledButton = styled.Text`
  font-size: 15px;
  color: #850000;
`;
