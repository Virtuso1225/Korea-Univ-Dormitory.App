import React, { useContext, useState, useRef, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  signup,
  getStudentInfo,
  isExistNickname,
  isExistStudent,
} from '../firebase';
import {
  removeWhitespace,
  validateSid,
  validateRoom,
  validatePassword,
} from '../utils';
import { ProgressContext } from '../contexts';

import {
  Input,
  InputWrapper,
  SubWrapper,
  BottomWrapper,
  Title,
  OptionWrapper,
  OptionDescription,
  OptionButton,
  ErrorText,
  Header,
  RowWrapper,
  Input2,
  EmailDescription,
  ColumnWrapper,
  RoomWrapper,
} from './RegisterStyle';
import LoginRegisterButton from '../button/LoginRegisterButton';

const Register = ({ navigation }) => {
  const dorms = [
    '학생동 (구관-남자동)',
    '학생동(구관-여자동)',
    '프런티어관(신관-남자동)',
    '프런티어관(신관-여자동)',
  ];
  const { spinner } = useContext(ProgressContext);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [sid, setSid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState('');
  const [dorm, setDorm] = useState('');
  const [room, setRoom] = useState('');
  const [nickname, setNickname] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [idFocused, setIdFocused] = useState(false);
  const [sidFocused, setSidFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [checkFocused, setCheckFocused] = useState(false);
  const [roomFocused, setRoomFocused] = useState(false);
  const [nicknameFocused, setNicknameFocused] = useState(false);

  const [nameError, setNameError] = useState('');
  const [sidError, setSidError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');
  const [dormError, setDormError] = useState('');
  const [roomError, setRoomError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const refName = useRef(null);
  const refSid = useRef(null);
  const refPassword = useRef(null);
  const refCheck = useRef(null);
  const refId = useRef(null);
  const refRoom = useRef(null);
  const refNickname = useRef(null);

  const refNameDidMount = useRef(null);
  const refSidDidMount = useRef(null);
  const refIdDidMount = useRef(null);
  const refPasswordDidMount = useRef(null);
  const refCheckDidMount = useRef(null);
  const refRoomDidMount = useRef(null);
  const refNicknameDidMount = useRef(null);

  const nameCheck = async () => {
    let errorMsg = '';

    if (!name) {
      errorMsg = '*필수 항목입니다.';
    }

    setNameError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refNameDidMount.current) {
      if (nameFocused === false) {
        nameCheck();
      }
    } else {
      refNameDidMount.current = true;
    }
  }, [nameFocused]);

  const sidCheck = async () => {
    let errorMsg = '';

    if (!sid) {
      errorMsg = '*필수 항목입니다.';
    } else if (sid && !validateSid(sid)) {
      errorMsg = '*학번 10자리를 확인해주세요.';
    }

    setSidError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refSidDidMount.current) {
      if (sidFocused === false) {
        sidCheck();
      }
    } else {
      refSidDidMount.current = true;
    }
  }, [sidFocused]);

  useEffect(() => {
    setEmail(`${id}@korea.ac.kr`);
  }, [id]);

  const idCheck = async () => {
    let errorMsg = '';

    if (!id) {
      errorMsg = '*필수 항목입니다.';
    }

    setIdError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refIdDidMount.current) {
      if (idFocused === false) {
        idCheck();
      }
    } else {
      refIdDidMount.current = true;
    }
  }, [idFocused]);

  const passwordCheck = async () => {
    let errorMsg = '';

    if (!password) {
      errorMsg = '*필수 항목입니다.';
    } else if (password && !validatePassword(password)) {
      errorMsg = '* 영문, 숫자를 모두 포함한 6자리 이상일 것.';
    }

    setPasswordError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refPasswordDidMount.current) {
      if (passwordFocused === false) {
        passwordCheck();
      }
    } else {
      refPasswordDidMount.current = true;
    }
  }, [passwordFocused]);

  const checkCheck = async () => {
    let errorMsg = '';

    if (!check) {
      errorMsg = '*필수 항목입니다.';
    } else if (check && password !== check) {
      errorMsg = '* 입력 값이 일치하지 않습니다.';
    }

    setCheckError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refCheckDidMount.current) {
      checkCheck();
    } else {
      refCheckDidMount.current = true;
    }
  }, [checkFocused]);

  const roomCheck = async () => {
    let errorMsg = '';

    if (!room) {
      errorMsg = '*필수 항목입니다.';
    } else if (room && !validateRoom(room)) {
      errorMsg = '* 양식을 맞춰주세요. ex) 245-1';
    }

    setRoomError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refRoomDidMount.current) {
      if (roomFocused === false) {
        roomCheck();
      }
    } else {
      refRoomDidMount.current = true;
    }
  }, [roomFocused]);

  const isExistStudentFunc = async () => {
    let existStudent = true;

    spinner.start();
    existStudent = isExistStudent(sid);
    spinner.stop();

    return existStudent;
  };

  const isExistStudentCheck = async () => {
    const existStudent = await isExistStudentFunc();

    return existStudent;
  };

  const isExistNicknameFunc = async () => {
    let existNickname = true;

    spinner.start();
    existNickname = isExistNickname(nickname);
    spinner.stop();

    return existNickname;
  };

  const nicknameCheck = async (existNickname) => {
    let errorMsg = '';

    if (!nickname) {
      errorMsg = '*필수 항목입니다.';
    } else if (existNickname) {
      errorMsg = '*이미 존재하는 닉네임입니다. 다른 닉네임을 사용하세요.';
    }

    setNicknameError(errorMsg);

    return errorMsg;
  };

  const lastNicknameCheck = async () => {
    const existNickname = await isExistNicknameFunc();
    await nicknameCheck(existNickname);

    return existNickname;
  };

  useEffect(() => {
    if (refNicknameDidMount.current) {
      if (nicknameFocused === false) {
        lastNicknameCheck();
      }
    } else {
      refNicknameDidMount.current = true;
    }
  }, [nicknameFocused]);

  const setStudentInfoFunc = async (sid) => {
    const getStudentInfoChart = await getStudentInfo(sid * 1);

    return getStudentInfoChart;
  };

  const lastStudentInfoCheck = async () => {
    const studentInfoChart = await setStudentInfoFunc(sid);

    let compareStudentInfo = true;

    if (
      studentInfoChart.name !== name ||
      studentInfoChart.dorm !== dorm ||
      studentInfoChart.room !== room
    ) {
      compareStudentInfo = false;
    }

    return [compareStudentInfo, studentInfoChart.index];
  };

  const lastCheck = () => {
    return Promise.all([
      lastNicknameCheck(),
      lastStudentInfoCheck(),
      nameCheck(),
      sidCheck(),
      idCheck(),
      passwordCheck(),
      checkCheck(),
      roomCheck(),
      isExistStudentCheck(),
    ]);
  };

  const _handleSignupBtnPress = () => {
    lastCheck().then((results) => {
      const existNickname = results[0];
      const compareStudentInfo = results[1][0];
      const index = results[1][1];
      const nameError = results[2];
      const sidError = results[3];
      const idError = results[4];
      const passwordError = results[5];
      const checkError = results[6];
      const roomError = results[7];
      const existStudent = results[8];

      if (nameError) {
        Alert.alert('회원가입 에러', '이름을 확인하세요.');
      } else if (sidError) {
        Alert.alert('회원가입 에러', '학번을 확인하세요.');
      } else if (idError) {
        Alert.alert('회원가입 에러', '메일 주소를 확인하세요.');
      } else if (passwordError) {
        Alert.alert('회원가입 에러', '비밀번호를 확인하세요.');
      } else if (checkError) {
        Alert.alert('회원가입 에러', '비밀번호 확인을 확인하세요.');
      } else if (roomError) {
        Alert.alert('회원가입 에러', '호실 정보를 확인하세요.');
      } else if (existNickname) {
        Alert.alert('회원가입 에러', '닉네임을 확인하세요.');
      } else if (existStudent) {
        Alert.alert(
          '회원가입 에러',
          '이미 가입된 사용자입니다.\n로그인 또는 비밀번호 찾기를 이용해주세요.',
          [
            {
              onPress: () => {
                navigation.push('Login');
              },
            },
          ]
        );
      } else if (!compareStudentInfo) {
        Alert.alert(
          '회원가입 에러',
          '학생정보를 확인하세요. \n정보가 올바르다면 관리자에게 문의하세요.'
        );
      } else {
        try {
          spinner.start();

          signup({
            name,
            sid,
            email,
            password,
            dorm,
            room,
            nickname,
            index,
          });

          Alert.alert('이메일 인증 요청', '메일을 확인해주세요.', [
            {
              onPress: () => {
                navigation.push('Login');
              },
            },
          ]);
        } catch (e) {
          Alert.alert('회원가입 에러', e.message);
        } finally {
          spinner.stop();
        }
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{ flex: 1, backgroundColor: '#f9f7f4', alignItems: 'center' }}
      >
        <Header>
          <Icon
            name="left"
            size={20}
            color="#707070"
            title="Login"
            onPress={() => navigation.push('Login')}
          />
          <Pressable onPress={() => navigation.push('Login')}>
            <Title>회원가입</Title>
          </Pressable>
        </Header>
        <KeyboardAwareScrollView>
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
                onSubmitEditing={() => refSid.current.focus()}
                onBlur={() => [setName(name.trim()), setNameFocused(false)]}
                onFocus={() => setNameFocused(true)}
                maxLength={12}
              />
              <ErrorText>{nameError}</ErrorText>
            </InputWrapper>
            <InputWrapper>
              <Input
                ref={refSid}
                label="Sid"
                placeholder="학번"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={sid}
                onChangeText={setSid}
                onSubmitEditing={() => refId.current.focus()}
                maxLength={10}
                onFocus={() => setSidFocused(true)}
                onBlur={() => setSidFocused(false)}
              />
              <ErrorText>{sidError}</ErrorText>
            </InputWrapper>
            <ColumnWrapper>
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
                  onBlur={() => [
                    setId(removeWhitespace(id)),
                    setIdFocused(false),
                  ]}
                  onFocus={() => setIdFocused(true)}
                />
                <EmailDescription>@korea.ac.kr</EmailDescription>
              </RowWrapper>
              <ErrorText>{idError}</ErrorText>
            </ColumnWrapper>
            <InputWrapper>
              <Input
                ref={refPassword}
                label="Password"
                placeholder="비밀번호"
                placeholderTextColor="#515151"
                returnKeyType="next"
                value={password}
                onChangeText={setPassword}
                isPassword
                onSubmitEditing={() => refCheck.current.focus()}
                onBlur={() => [
                  setPassword(removeWhitespace(password)),
                  setPasswordFocused(false),
                ]}
                onFocus={() => setPasswordFocused(true)}
                secureTextEntry
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
                onBlur={() => [
                  setCheck(removeWhitespace(check)),
                  setCheckFocused(false),
                ]}
                onFocus={() => setCheckFocused(true)}
                onSubmitEditing={() => refRoom.current.focus()}
                secureTextEntry
              />
              <ErrorText>{checkError}</ErrorText>
            </InputWrapper>
            <RowWrapper>
              <ColumnWrapper>
                <SelectDropdown
                  data={dorms}
                  buttonStyle={styles.buttonStyle}
                  buttonTextStyle={styles.buttonTextStyle}
                  onSelect={(selectedItem, index) => {
                    setDorm(index);
                  }}
                  defaultButtonText="소속 동"
                  dropdownStyle={styles.dropdownStyle}
                  rowStyle={styles.rowStyle}
                  rowTextStyle={styles.rowTextStyle}
                  renderDropdownIcon={() => (
                    <Icon name="down" size={10} color="#9F9F9F" />
                  )}
                  dropDownIconPosition="right"
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => item}
                />
                <ErrorText>{dormError}</ErrorText>
              </ColumnWrapper>
              <RoomWrapper>
                <Input2
                  ref={refRoom}
                  label="Room"
                  placeholder="소속 호실 ex) 245 - 1"
                  placeholderTextColor="#515151"
                  returnKeyType="next"
                  value={room}
                  onChangeText={setRoom}
                  onSubmitEditing={() => refNickname.current.focus()}
                  onBlur={() => [
                    setRoom(removeWhitespace(room)),
                    setRoomFocused(false),
                  ]}
                  onFocus={() => setRoomFocused(true)}
                />
                <ErrorText>{roomError}</ErrorText>
              </RoomWrapper>
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
                onBlur={() => [
                  setNickname(removeWhitespace(nickname)),
                  setNicknameFocused(false),
                ]}
                onFocus={() => setNicknameFocused(true)}
                onSubmitEditing={_handleSignupBtnPress}
              />
              <ErrorText>{nicknameError}</ErrorText>
            </InputWrapper>
          </SubWrapper>
        </KeyboardAwareScrollView>
        <BottomWrapper>
          <LoginRegisterButton
            text="가입하기"
            handler={_handleSignupBtnPress}
          />
          <OptionWrapper>
            <OptionDescription>이미 계정이 있습니까? </OptionDescription>
            <OptionButton
              title="Login"
              onPress={() => navigation.push('Login')}
            >
              로그인
            </OptionButton>
          </OptionWrapper>
        </BottomWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: responsiveScreenWidth(41.7),
    height: 24,
    borderBottomWidth: 1,
    borderColor: 'rgba(133, 0, 0, 0.1)',
    backgroundColor: '#f9f7f4',
    paddingBottom: 8,
  },
  buttonTextStyle: {
    fontSize: responsiveScreenFontSize(1.5),
    width: responsiveScreenWidth(41.7),
    textAlign: 'left',
    color: '#515151',
    fontFamily: 'Medium',
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
