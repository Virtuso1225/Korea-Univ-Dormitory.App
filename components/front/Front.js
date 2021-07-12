import React, { useContext, useState, useRef, useEffect} from 'react';
import {StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';
import { TouchableOpacity } from 'react-native';

import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  InputWrapper,
  Input,
  StyledButton,
  BottomWrapper,
  CheckWrapper,
  Check,
  Description,
  TextArea, ErrorText, 
} from './FrontStyle';




const Front = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const refPassword = useRef(null);

  // useEffect(() => {
  //   setDisabled(!(email && password && !errorMessage));
  // }, [email, password, errorMessage]);

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
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          // colors={['red', 'yellow', 'green']}
          style={styles.TextWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
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
        </LinearGradient>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.TextWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
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
        </LinearGradient>
        <CheckWrapper>
          <Check>
            <Icon name="check" size={25} color="#707070" />
          </Check>
          <Description>Keep me logged in</Description>
        </CheckWrapper>
        <ErrorText>{errorMessage}</ErrorText>
      </TextArea>
      
      
      <BottomWrapper>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.ButtonWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <StyledButton title="Sign in" onPress={_handleSigninBtnPress}>
            Login
          </StyledButton>          
        </LinearGradient>
       
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.ButtonWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <StyledButton title="회원가입" onPress={() => navigation.navigate('Register')}>
            Register
          </StyledButton>
        </LinearGradient>
      </BottomWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  TextWrapper: {
    borderRadius: 10,
    minWidth: 301,
    height: 54,
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingTop: 3,
    paddingLeft: 10,
    paddingBottom: 3,
    paddingRight: 10,
    marginTop: 29,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ButtonWrapper: {
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    width: 140,
    height: 39,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
        
  },
});

export default Front;
