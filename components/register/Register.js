import React, {
  Component,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { signup } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace, validateEmailDomain } from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Input,
  InputWrapper,
  SubWrapper,
  BottomWrapper,
  ButtonWrapper,
  StyledButton,
  TitleWrapper,
  Title,
  OptionWrapper,
  OptionDescription,
  Option,
  OptionButton,
  ErrorText,
  IconWrapper,
  Header,
} from './RegisterStyle';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dorm, setDorm] = useState('');
  const [room, setRoom] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refName = useRef(null);
  const refDorm = useRef(null);
  const refRoom = useRef(null);
  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(!(name && email && password && dorm && room && !errorMessage));
  }, [email, name, password, dorm, room, errorMessage]);

  useEffect(() => {
    if (refDidMount.current) {
      let error = '';
      if (!email) {
        error = 'Please enter your email';
      } else if (!validateEmail(email)) {
        error = 'Please verify your email';
      } else if (!validateEmailDomain(email)) {
        error = 'Please use Korea University Domain';
      } else if (password.length < 6) {
        error = 'The password must contain 6 characters at least';
      } else if (!name) {
        error = 'Please enter your name';
      } else if (!dorm) {
        error = 'Please enter your dorm';
      } else if (!room) {
        error = 'Please enter your room';
      } else {
        error = '';
      }
      setErrorMessage(error);
    } else {
      refDidMount.current = true;
    }
  }, [email, name, password, dorm, room]);

  const _handleSignupBtnPress = async () => {
    try {
      const user = await signup({ name, email, password, dorm, room });
      navigation.navigate('Main', { user });
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#ecedf2' }}>
        <Header>
          <IconWrapper>
            <Icon
              name="arrowleft"
              size={25}
              color="#000000"
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          </IconWrapper>
          <TitleWrapper>
            <Title>회원가입</Title>
          </TitleWrapper>
        </Header>
        <SubWrapper>
          <InputWrapper>
            <Input
              label="Email"
              placeholder="Email"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => refPassword.current.focus()}
              onBlur={() => setEmail(removeWhitespace(email))}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              ref={refPassword}
              label="Password"
              placeholder="Password"
              returnKeyType="next"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              onSubmitEditing={() => refName.current.focus()}
              onBlur={() => setPassword(removeWhitespace(password))}
              secureTextEntry={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              ref={refName}
              label="Name"
              placeholder="Name"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => refDorm.current.focus()}
              onBlur={() => setName(name.trim())}
              maxLength={12}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              ref={refDorm}
              label="Dorm"
              placeholder="소속 동"
              returnKeyType="next"
              value={dorm}
              onChangeText={setDorm}
              onSubmitEditing={() => refRoom.current.focus()}
              // onBlur={() => setName(name.trim())}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              ref={refRoom}
              label="Room"
              placeholder="호실"
              returnKeyType="done"
              value={room}
              onChangeText={setRoom}
              onSubmitEditing={_handleSignupBtnPress}
            />
          </InputWrapper>
          <ErrorText>{errorMessage}</ErrorText>
        </SubWrapper>
        <BottomWrapper>
          <ButtonWrapper
            title="Sign up"
            onPress={_handleSignupBtnPress}
            disabled={disabled}
          >
            <StyledButton>Sign up</StyledButton>
          </ButtonWrapper>
          <OptionWrapper>
            <OptionDescription>Already have an account? </OptionDescription>
            <OptionButton
              title="Login"
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </OptionButton>
          </OptionWrapper>
        </BottomWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
