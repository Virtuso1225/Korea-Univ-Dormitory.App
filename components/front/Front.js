import React from 'react';
import { Text, View, Button } from 'react-native';
import {
  ButtonWrapper,
  HeadTitle,
  InputContent,
  SubTitle,
  TextWrapper,
  TitleWrapper,
  InputWrapper,
  Input,
  StyledButton,
  BottomWrapper,
} from './FrontStyle';

const Front = ({ navigation }) => {
  return (
    <>
      <TitleWrapper>
        <HeadTitle>안암학사</HeadTitle>
        <SubTitle>고려대학교</SubTitle>
      </TitleWrapper>
      <BottomWrapper>
        <TextWrapper>
          <InputWrapper>
            <InputContent>user ID (학번)</InputContent>
            <Input />
          </InputWrapper>
          <InputWrapper>
            <InputContent>password</InputContent>
            <Input />
          </InputWrapper>
        </TextWrapper>
        <ButtonWrapper>
          <StyledButton onPress={() => navigation.navigate('Login')}>
            Login
          </StyledButton>
          <StyledButton onPress={() => navigation.navigate('Register')}>
            Register
          </StyledButton>
        </ButtonWrapper>
      </BottomWrapper>
    </>
  );
};

export default Front;
