import React, { useContext, useState, useRef, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';


import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  InputWrapper,
  Input,
  ButtonWrapper,
  StyledButton,
  BottomWrapper,
  CheckWrapper,
  Check,
  Description,
  TextArea, 
  ErrorText, 
  TextWrapper,
  Check2,
} from './FrontStyle';




const Front = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelected, setSelection] = useState(false);
  const refPassword = useRef(null);
 


  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(      
      validateEmail(changedEmail) ? "" : '이메일을 형식을 확인하세요'
    );
  };

  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  const _handleSigninBtnPress = async () => {
    try {
      const user = await signin({ email, password });
      navigation.navigate('Main', {user});
    } catch (e) {
      Alert.alert('Signin Error', e.message);
    }
  };


  return (
    <>
      <TitleWrapper>
        <HeadTitle>안암학사</HeadTitle>
        <SubTitle>고려대학교</SubTitle>
      </TitleWrapper>
      
      <TextArea>
        <TextWrapper>    
          <InputWrapper>
            <Input
              label="Email"
              placeholder="Email"
              returnKeyType="next"
              value={email}
              onChangeText={_handleEmailChange}
              onSubmitEditing={() => refPassword.current.focus()}    
              />  
          </InputWrapper>
        </TextWrapper>
        <TextWrapper>       
          <InputWrapper>
            <Input
              ref={refPassword}
              label="Password"
              placeholder="Password"
              returnKeyType="done"
              value={password}
              onChangeText={_handlePasswordChange}
              isPassword={true}
              onSubmitEditing={_handleSigninBtnPress}
            />
          </InputWrapper>
        </TextWrapper>
        <CheckWrapper>
          <TouchableOpacity
            onPress={() => {
              isSelected ? setSelection(false) : setSelection(true);
            }}
          >
            {isSelected ? (
              <Check>
                <Icon name="check" size={25} color="#707070" />
              </Check>
            ) : (
              <Check />
            )}
          </TouchableOpacity>
          <Description>Keep me logged in</Description>
        </CheckWrapper>
        <ErrorText>{errorMessage}</ErrorText>
      </TextArea>
      
      
      <BottomWrapper>
        <ButtonWrapper>
          <StyledButton title="Sign in" onPress={_handleSigninBtnPress}>
            Login
          </StyledButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <StyledButton title="회원가입" onPress={() => navigation.navigate('Register')}>
            Register
          </StyledButton>
        </ButtonWrapper>
      </BottomWrapper>
    </>
  );
};


export default Front;
