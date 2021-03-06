import React, { useState, useRef, useEffect, useContext } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { UserContext, ProgressContext } from '../contexts';
import { SubHeader, SelectionWrapper, Input } from './DormInfoStyle';
import { BackgroundWrapper, Body, RowWrapper } from './DropOutStyle';
import { removeWhitespace, validatePassword } from '../utils';
import { comparePassword, updatePasswordInfo, signout } from '../firebase';
import { ErrorText } from '../register/RegisterStyle';
import MypageHeader from '../mypageheader/MypageHeader';
import SubmitButton from '../button/SubmitButton';
import CustomText from '../theme/CustomTextStyle';

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
      errorMsg = '* 영문, 숫자를 모두 포함한 6자리 이상일 것.';
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
      Alert.alert('로그아웃 에러', '다시 시도하세요.');
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
        Alert.alert('비밀번호 재설정 에러', '기존 비밀번호를 확인하세요.');
      } else if (newPasswordsError) {
        Alert.alert('비밀번호 재설정 에러', '새로운 비밀번호를 확인하세요.');
      } else {
        try {
          spinner.start();
          updatePasswordInfo(newPassword);
          Alert.alert(
            'Success!',
            '정보 업데이트에 성공했습니다.\n새로운 비밀번호로 로그인하세요.',
            [
              {
                text: 'OK',
                onPress: () => Signout(),
              },
            ]
          );
        } catch (e) {
          Alert.alert('비밀번호 재설정 에러', e.message);
        } finally {
          spinner.stop();
        }
      }
    });
  };

  const closeHandler = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <MypageHeader pageInfo="비밀번호 변경" handler={closeHandler} />
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
                error={oldPasswordError}
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
                error={newPasswordError}
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
                error={checkError}
              />
            </RowWrapper>
            <ErrorText>{checkError}</ErrorText>
            <SubmitButton handler={_handleUpdateBtnPress} />
          </SelectionWrapper>
        </Body>
      </BackgroundWrapper>
    </TouchableWithoutFeedback>
  );
};
export default PasswordInfo;
