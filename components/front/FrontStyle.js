import styled from 'styled-components/native';

export const TitleWrapper = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: none;
  align-items: center;
  padding-top: 100px;
`;

export const HeadTitle = styled.Text`
  padding-bottom: 10px;
  font-size: 50px;
  color: gray;
`;

export const SubTitle = styled.Text`
  font-size: 25px;
  color: gray;
`;

export const BottomWrapper = styled.View`
  display: flex;
  margin-bottom: 50px;
`;
export const TextWrapper = styled.View`
  display: flex;
  background-color: lightgray;
  border: none;
  border-radius: 12px;
  min-width: 200px;
  height: 50px;
  justify-content: space-around;
  align-self: center;
  padding: 3px 10px 3px 10px;
`;

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const InputContent = styled.Text`
  font-size: 10px;
`;

export const Input = styled.TextInput`
  font-size: 10px;
  margin-left: 15px;
  padding-left: 4px;
  border-bottom-color: rgba(0, 0, 0, 0.5);
  border-bottom-width: 1px;
  min-width: 80px;
  align-content: flex-end;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 8px;
`;

export const StyledButton = styled.Text`
  display: flex;
  padding-left: 2.5px;
  padding-right: 2.5px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  font-size: 15px;
  color: black;
  background-color: lightgray;
  min-width: 80px;
  justify-content: center;
  text-align: center;
`;
