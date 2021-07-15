import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace, validateEmailDomain } from '../utils';
import { UserContext, ProgressContext} from '../contexts';

import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  Logo,
  Input,
  ButtonWrapper,
  StyledButton,
  BottomWrapper,
  CheckWrapper,
  Check,
  Description,
  TextArea,
  TextWrapper,
  EngSub,
  Separate,
  Titles,
  InputWrapper,
  ErrorText,
} from './FrontStyle';

const Front = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSelected, setSelection] = useState(false);
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const refPassword = useRef(null);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    if (validateEmail(changedEmail)) {
      setErrorMessage(
        validateEmailDomain(changedEmail)
          ? ''
          : '학교 도메인 이메일을 사용해주세요'
      );
    } else {
      setErrorMessage('이메일 형식을 확인하세요');
    }
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleSigninBtnPress = async () => {
    try {
      spinner.start();
      const user = await signin({ email, password });
      setUser(user);
    } catch (e) {
      Alert.alert('Signin Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#ecedf2' }}>
        <TitleWrapper>
          <HeadTitle>안암학사</HeadTitle>
          <Separate>
            <Logo source={require('../../assets/crimson2positive.png')} />
            <Titles>
              <SubTitle>고려대학교</SubTitle>
              <EngSub>KOREA UNIVERSITY</EngSub>
            </Titles>
          </Separate>
        </TitleWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1.6 }}
        >
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
                  secureTextEntry={true}
                />
              </InputWrapper>
            </TextWrapper>
            <CheckWrapper>
              <TouchableOpacity
                onPress={() => {
                  isSelected ? setSelection(false) : setSelection(true);
                }}
              >
                <Check>
                  {isSelected && (
                    <Icon name="check" size={25} color="#707070" />
                  )}
                </Check>
              </TouchableOpacity>
              <Description>Keep me logged in</Description>
            </CheckWrapper>
            <ErrorText>{errorMessage}</ErrorText>
          </TextArea>
        </KeyboardAvoidingView>
        <BottomWrapper>
          <ButtonWrapper title="Sign in" onPress={_handleSigninBtnPress}>
            <StyledButton>Login</StyledButton>
          </ButtonWrapper>
          <ButtonWrapper
            title="회원가입"
            onPress={() => navigation.navigate('Register')}
          >
            <StyledButton>Register</StyledButton>
          </ButtonWrapper>
        </BottomWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Front;
