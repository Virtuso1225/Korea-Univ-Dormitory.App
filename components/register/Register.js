import React, {
  Component,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signup } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace, validateEmailDomain } from '../utils';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext, ProgressContext } from '../contexts';

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
  OptionButton,
  ErrorText,
  IconWrapper,
  Header,
  RowWrapper,
  Input2,
  EmailDescription,
} from './RegisterStyle';

const Register = ({ navigation }) => {
  const dorms = [
    '학생동(구관-남자동)',
    '학생동(구관-여자동)',
    '프런티어관(신관-남자동)',
    '프런티어관(신관-여자동)',
  ];

  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [dorm, setDorm] = useState('');
  const [room, setRoom] = useState('');
  const [nickname, setNickname] = useState('');
  const [nameError, setNaemError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [dormError, setDormError] = useState('');
  const [roomError, setRoomError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [disabled, setDisabled] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refCheck = useRef(null);
  // const refName = useRef(null);
  // const refDorm = useRef(null);
  const refRoom = useRef(null);
  const refNickname = useRef(null);
  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
      !(
        name &&
        email &&
        password &&
        check &&
        dorm &&
        room &&
        nickname &&
        !nameError &&
        !idError &&
        !passwordError &&
        !checkError &&
        !dormError &&
        !roomError &&
        !nicknameError
      )
    );
  }, [
    name,
    email,
    password,
    check,
    dorm,
    room,
    nickname,
    nameError,
    idError,
    passwordError,
    checkError,
    dormError,
    roomError,
    nicknameError,
  ]);

  useEffect(() => {
    if (refDidMount.current) {
      let error = '';

      if (!name) {
        setNaemError('* 필수 항목입니다.');
      } else {
        setNaemError('');
      }
      if (!email) {
        setIdError('* 필수 항목입니다.');
      } else {
        setIdError('');
      }
      // if (!email) {
      //   error = 'Please enter your email';
      // } else if (!validateEmail(email)) {
      //   error = 'Please verify your email';
      // } else if (!validateEmailDomain(email)) {
      //   error = 'Please use Korea University Domain';
      // }
      if (email && name) {
        if (!password) {
          setPasswordError('* 필수 항목입니다.');
        } else if (password.length < 6) {
          setPasswordError(
            '* 영문, 숫자, 특수기호를 모두 포함한 6자리 이상일 것.'
          );
        } else {
          setPasswordError('');
        }
      }
      if (check !== '') {
        if (password !== check) {
          setCheckError('* 입력 값이 일치하지 않습니다.');
        } else {
          setCheckError('');
        }
      }
    } else {
      refDidMount.current = true;
    }
  }, [name, email, password, check, dorm, room, nickname]);

  const _handleSignupBtnPress = async () => {
    try {
      spinner.start();
      const user = await signup({
        name,
        email,
        password,
        dorm,
        room,
        nickname,
      });
      setUser(user);
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#f9f7f4' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 4 }}
        >
          <Header>
            <IconWrapper>
              <Icon
                name="left"
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
                label="Name"
                placeholder="이름"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={name}
                onChangeText={setName}
                onSubmitEditing={() => refEmail.current.focus()}
                onBlur={() => setName(name.trim())}
                maxLength={12}
              />
              <ErrorText>{nameError}</ErrorText>
            </InputWrapper>
            <RowWrapper>
              <Input
                ref={refEmail}
                label="Email"
                placeholder="아이디 (KUPID 계정과 동일)"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => refPassword.current.focus()}
                onBlur={() => setEmail(removeWhitespace(email))}
              />
              <EmailDescription>@korea.ac.kr</EmailDescription>
            </RowWrapper>
            <InputWrapper>
              <Input
                ref={refPassword}
                label="Password"
                placeholder="비밀번호"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={password}
                onChangeText={setPassword}
                isPassword={true}
                onSubmitEditing={() => refCheck.current.focus()}
                onBlur={() => setPassword(removeWhitespace(password))}
                secureTextEntry={true}
              />
              <ErrorText>{passwordError}</ErrorText>
            </InputWrapper>
            <InputWrapper>
              <Input
                ref={refCheck}
                label="PasswordCheck"
                placeholder="비밀번호 확인"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={check}
                onChangeText={setCheck}
                isPassword={true}
                onBlur={() => setCheck(removeWhitespace(check))}
                secureTextEntry={true}
              />
              <ErrorText>{checkError}</ErrorText>
            </InputWrapper>
            <RowWrapper>
              <SelectDropdown
                data={dorms}
                buttonStyle={styles.buttonStyle}
                buttonTextStyle={styles.buttonTextStyle}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                defaultButtonText={'소속 동'}
                dropdownStyle={styles.dropdownStyle}
                rowTextStyle={styles.rowStyle}
                rowTextStyle={styles.rowTextStyle}
                renderDropdownIcon={() => {
                  return <Icon name="down" size={10} color="#9F9F9F" />;
                }}
                dropDownIconPosition={'right'}
                buttonTextAfterSelection={(selectedItem, index) => {
                  () => {
                    setDorm(selectedItem);
                  };
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              <Input2
                ref={refRoom}
                label="Room"
                placeholder="소속 호실 ex) 245 - 1"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={room}
                onChangeText={setRoom}
                onSubmitEditing={() => refNickname.current.focus()}
                onSubmitEditing={_handleSignupBtnPress}
              />
            </RowWrapper>
            <InputWrapper>
              <Input
                ref={refNickname}
                label="Nickname"
                placeholder="닉네임"
                placeholderTextColor="#515151"
                returnKeyType="done"
                value={nickname}
                onChangeText={setNickname}
                onBlur={() => setNickname(removeWhitespace(nickname))}
              />
            </InputWrapper>
            <ErrorText>{nicknameError}</ErrorText>
          </SubWrapper>
        </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#ffffff',
  },
  bottomShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#d4d2cf',
  },
  buttonStyle: {
    width: 143,
    height: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(133, 0, 0, 0.15)',
    backgroundColor: '#f9f7f4',
  },
  buttonTextStyle: {
    fontSize: 12,
    width: 143,
    textAlign: 'left',
    color: '#515151',
  },
  dropdownStyle: {
    backgroundColor: '#f9f7f4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  rowStyle: {
    backgroundColor: '#f9f7f4',
  },
  rowTextStyle: {
    fontSize: 12,
    color: '#515151',
  },
});
export default Register;
