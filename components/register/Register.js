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
import { signup, signout } from '../firebase';
import { Alert } from 'react-native';
import {
  validateEmail,
  removeWhitespace,
  validateEmailDomain,
  validatePassword,
  validateRoom,
} from '../utils';
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
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [dorm, setDorm] = useState('');
  const [room, setRoom] = useState('');
  const [nickname, setNickname] = useState('');

  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [dormError, setDormError] = useState('');
  const [roomError, setRoomError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [disabled, setDisabled] = useState(true);
  const refName = useRef(null);
  const refPassword = useRef(null);
  const refCheck = useRef(null);
  const refId = useRef(null);
  const refRoom = useRef(null);
  const refNickname = useRef(null);

  const refDidMount = useRef(null);

  useEffect(() => {
    setDisabled(
      !(
        name &&
        id &&
        password &&
        dorm &&
        room &&
        nickname &&
        !nameError &&
        !passwordError &&
        !checkError &&
        !roomError &&
        !nicknameError
      )
    );
  }, [
    name,
    id,
    password,
    dorm,
    room,
    nickname,
    nameError,
    passwordError,
    checkError,
    roomError,
    nicknameError,
  ]);

  useEffect(() => {
    if (refDidMount.current) {
      if (!name) {
        setNameError('*필수 항목입니다.');
        // setPasswordError('');
        // setCheckError('');
        // setRoomError('');
        // setNicknameError('');
      } else {
        setNameError('');
      }

      if (!password) {
        setPasswordError('*필수 항목입니다.');
        // setNameError('');
        // setCheckError('');
        // setRoomError('');
        // setNicknameError('');
      } else if (password && !validatePassword(password)) {
        setPasswordError(
          '* 영문, 숫자, 특수기호를 모두 포함한 6자리 이상일 것.'
        );
      } else {
        setPasswordError('');
      }

      if (check && password != check) {
        setCheckError('* 입력 값이 일치하지 않습니다.');
        // setNameError('');
        // setPasswordError('');
        // setRoomError('');
        // setNicknameError('');
      } else {
        setCheckError('');
      }

      if (!room) {
        setRoomError('*필수 항목입니다.');
        // setNameError('');
        // setPasswordError('');
        // setCheckError('');
        // setNicknameError('');
      } else if (room && !validateRoom(room)) {
        setRoomError('* 양식을 맞춰주세요. ex) 245-1');
      } else {
        setRoomError('');
      }

      if (!nickname) {
        setNicknameError('*필수 항목입니다.');
        // setNameError('');
        // setPasswordError('');
        // setCheckError('');
        // setRoomError('');
      } else {
        setNicknameError('');
      }
    } else {
      refDidMount.current = true;
    }
  }, [name, password, check, room, nickname]);

  useEffect(() => {
    setEmail(id + '@korea.ac.kr');
  }, [id]);

  const _handleSignupBtnPress = async () => {
    console.log('dorm: ', dorm);
    if (disabled) {
      if (!name) {
        Alert.alert('Signup Error', '이름은 필수 항목입니다.');
      } else if (!id) {
        Alert.alert('Signup Error', '아이디는 필수 항목입니다.');
      } else if (!password) {
        Alert.alert('Signup Error', '비밀번호는 필수 항목입니다.');
      } else if (!check) {
        Alert.alert('Signup Error', '비밀번호 확인은 필수 항목입니다.');
      } else if (!room) {
        Alert.alert('Signup Error', '호실 정보는 필수 항목입니다.');
      } else if (!nickname) {
        Alert.alert('Signup Error', '닉네임은 필수 항목입니다.');
      }
    } else {
      try {
        spinner.start();
        await signup({
          name,
          email,
          password,
          dorm,
          room,
          nickname,
        });
        // Alert.prompt()
        Alert.alert('이메일 인증 요청', '메일을 확인해주세요.', [
          {
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
        // navigation.navigate('Login');
      } catch (e) {
        Alert.alert('Signup Error', e.message);
      } finally {
        spinner.stop();
      }
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
                ref={refName}
                label="Name"
                placeholder="이름"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={name}
                onChangeText={setName}
                onSubmitEditing={() => refId.current.focus()}
                onBlur={() => setName(name.trim())}
                maxLength={12}
              />
              <ErrorText>{nameError}</ErrorText>
            </InputWrapper>
            <RowWrapper>
              <Input
                ref={refId}
                label="Id"
                placeholder="아이디 (KUPID 계정과 동일)"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={id}
                onChangeText={setId}
                onSubmitEditing={() => refPassword.current.focus()}
                onBlur={() => setId(removeWhitespace(id))}
              />
              <EmailDescription>@korea.ac.kr</EmailDescription>
            </RowWrapper>
            {/* <ErrorText>{idError}</ErrorText> */}
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
                  setDorm(selectedItem);
                  console.log(selectedItem, index);
                  console.log(dorm);
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
              />
            </RowWrapper>
            <ErrorText>{roomError}</ErrorText>
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
                onSubmitEditing={_handleSignupBtnPress}
              />
              <ErrorText>{nicknameError}</ErrorText>
            </InputWrapper>
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
