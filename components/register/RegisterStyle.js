import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  align-items: center;
`;

export const SubWrapper = styled.View`
  margin-top: 130px;
`;

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export const InputContent = styled.Text`
  font-size: 20px;
`;

export const Input = styled.TextInput`
  font-size: 20px;
  margin-left: 20px;
  padding-left: 10px;
  background-color: lightgray;
  min-width: 150px;
  min-height: 25px;
  border-radius: 10px;
  align-content: flex-end;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 30px;
  background-color: lightgray;
  border-radius: 12px;
  min-width: 100px;
  min-height: 30px;
  justify-content: center;
`;

export const StyledButton = styled.Text`
  display: flex;
  padding-left: 2.5px;
  padding-right: 2.5px;
  margin-left: 2.5px;
  margin-right: 2.5px;
  font-size: 15px;
  color: black;
  font-size: 20px;
`;
