import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import { UserContext, ProgressContext } from '../contexts';
import {
  SubHeader,
  SelectionWrapper,
  ButtonWrapper,
  Input,
} from './DormInfoStyle';
import {
  BackgroundWrapper,
  Body,
  RowWrapper,
  CloseWrapper,
} from './DropOutStyle';
import {
  removeWhitespace,
  validateSid,
  validatePassword,
  validateRoom,
} from '../utils';
import { comparePassword, updatePasswordInfo, signout } from '../firebase';
import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { ErrorText } from '../register/RegisterStyle';

const PasswordInfo = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [check, setCheck] = useState('');

  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');

  const refOldPassword = useRef(null);
  const refNewPassword = useRef(null);
  const refCheck = useRef(null);
  const refOldPasswordDidMount = useRef(null);
  const refNewPasswordDidMount = useRef(null);
  const refCheckDidMount = useRef(null);

  const [oldPasswordFocused, setOldPasswordFocused] = useState(false);
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [checkFocused, setCheckFocused] = useState(false);

  const comparePasswordFunc = async () => {
    const isDifferent = await comparePassword(oldPassword);

    return isDifferent;
  };

  const oldPasswordCheck = async (comparePassword) => {
    let errorMsg = '';

    if (!oldPassword) {
      errorMsg = '*필수 항목입니다.';
    } else if (comparePassword) {
      errorMsg = '*잘못된 비밀번호입니다.';
    }

    setOldPasswordError(errorMsg);

    return errorMsg;
  };

  const newPasswordCheck = async () => {
    let errorMsg = '';

    if (!newPassword) {
      errorMsg = '*필수 항목입니다.';
    } else if (newPassword && !validatePassword(newPassword)) {
      errorMsg = '* 영문, 숫자, 특수기호를 모두 포함한 6자리 이상일 것.';
    }

    setNewPasswordError(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refNewPasswordDidMount.current) {
      if (newPasswordFocused === false) {
        newPasswordCheck();
      }
    } else {
      refNewPasswordDidMount.current = true;
    }
  }, [newPasswordFocused]);

  const checkCheck = async () => {
    let errorMsg = '';

    if (!check) {
      errorMsg = '*필수 항목입니다.';
    } else if (check && newPassword !== check) {
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

  const lastOldPasswordCheck = async () => {
    const comparePassword = await comparePasswordFunc();
    await oldPasswordCheck(comparePassword);

    return comparePassword;
  };

  const lastNewPasswordCheck = async () => {
    const newPasswordError = await newPasswordCheck();
    const checkError = await checkCheck();

    return newPasswordError || checkError;
  };

  const lastCheck = () => {
    return Promise.all([lastOldPasswordCheck(), lastNewPasswordCheck()]);
  };

  const Signout = () => {
    try {
      spinner.start();
      signout();
    } catch (e) {
      Alert.alert('signout error', '에러 발생');
    } finally {
      setUser({});
      spinner.stop();
    }
  };

  const _handleUpdateBtnPress = () => {
    lastCheck().then((results) => {
      const comparePassword = results[0];
      const newPasswordsError = results[1];

      if (!oldPassword || comparePassword) {
        Alert.alert('Update Error', '기존 비밀번호를 확인하세요.');
      } else if (newPasswordsError) {
        Alert.alert('Update Error', '새로운 비밀번호를 확인하세요.');
      } else {
        try {
          spinner.start();
          updatePasswordInfo(newPassword);
          Alert.alert(
            'Success',
            '정보 업데이트에 성공했습니다.\n새로 로그인하세요.',
            [
              {
                text: 'OK',
                onPress: () => Signout(),
              },
            ]
          );
        } catch (e) {
          Alert.alert('Update Error', e.message);
        } finally {
          spinner.stop();
        }
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <Header>
          <RowWrapper>
            <PageTitle>비밀번호 변경</PageTitle>
            <CloseWrapper onPress={() => navigation.goBack()}>
              <Close name="close" size={20} color="#707070" />
            </CloseWrapper>
          </RowWrapper>
        </Header>
        <Body>
          <SelectionWrapper>
            <SubHeader>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                안암학사 어플 프로필을 설정해주세요.
              </CustomText>
            </SubHeader>
            <RowWrapper>
              <Input
                ref={refOldPassword}
                label="OldPassword"
                placeholder="기존 비밀번호 입력"
                placeholderTextColor="#8E8E8E"
                returnKeyType="next"
                value={oldPassword}
                onChangeText={setOldPassword}
                onSubmitEditing={() => refNewPassword.current.focus()}
                onBlur={() => [
                  setOldPassword(removeWhitespace(oldPassword)),
                  setOldPasswordFocused(false),
                ]}
                onFocus={() => setOldPasswordFocused(true)}
                secureTextEntry
              />
            </RowWrapper>
            <ErrorText>{oldPasswordError}</ErrorText>
            <RowWrapper>
              <Input
                ref={refNewPassword}
                label="NewPassword"
                placeholder="새로운 비밀번호 입력"
                placeholderTextColor="#8E8E8E"
                returnKeyType="next"
                value={newPassword}
                onChangeText={setNewPassword}
                isPassword
                onSubmitEditing={() => refCheck.current.focus()}
                onBlur={() => [
                  setNewPassword(removeWhitespace(newPassword)),
                  setNewPasswordFocused(false),
                ]}
                onFocus={() => setNewPasswordFocused(true)}
                secureTextEntry
              />
            </RowWrapper>
            <ErrorText>{newPasswordError}</ErrorText>
            <RowWrapper>
              <Input
                ref={refCheck}
                label="PasswordCheck"
                placeholder="새로운 비밀번호 확인"
                placeholderTextColor="#8E8E8E"
                returnKeyType="done"
                value={check}
                onChangeText={setCheck}
                isPassword
                onBlur={() => [
                  setCheck(removeWhitespace(check)),
                  setCheckFocused(false),
                ]}
                onFocus={() => setCheckFocused(true)}
                onSubmitEditing={_handleUpdateBtnPress}
                secureTextEntry
              />
            </RowWrapper>
            <ErrorText>{checkError}</ErrorText>
            <View style={styles.topShadow}>
              <View style={styles.bottomShadow}>
                <ButtonWrapper onPress={_handleUpdateBtnPress}>
                  <CustomText
                    font="Medium"
                    size={responsiveScreenFontSize(1.8)}
                    color="#1D1D1D"
                  >
                    완료
                  </CustomText>
                </ButtonWrapper>
              </View>
            </View>
          </SelectionWrapper>
        </Body>
      </BackgroundWrapper>
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
    fontSize: responsiveScreenFontSize(1.5),
    width: 143,
    textAlign: 'left',
    color: '#8E8E8E',
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
    color: '#8E8E8E',
  },
});
export default PasswordInfo;
