import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import { findPassword } from '../firebase';
import { removeWhitespace } from '../utils';
import { ProgressContext } from '../contexts';

import {
  Input,
  SubWrapper,
  ErrorText,
  RowWrapper,
  EmailDescription,
  IconWrapper,
} from './FindPasswordStyle';
import { BackgroundWrapper, Body, ButtonWrapper } from '../mypage/DropOutStyle';
import { Header, PageTitle } from '../mypage/MypageStyle';
import { CustomText } from '../mypage/ModalComponentStyle';
import { SubHeader } from '../mypage/DormInfoStyle';

const FindPassword = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  const [idFocused, setIdFocused] = useState(false);
  const [idError, setIdError] = useState('');

  const refIdDidMount = useRef(null);

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

  const passwordResetEmail = async () => {
    const result = await findPassword(email);

    return result;
  };

  const _handleFindPasswordBtnPress = () => {
    idCheck().then((results) => {
      const idError = results;

      if (idError) {
        Alert.alert('비밀번호 재설정 에러', '메일 주소를 확인하세요.');
      } else {
        try {
          spinner.start();
          passwordResetEmail().then((result) => {
            if (result[0]) {
              Alert.alert(
                '이메일 인증 요청',
                '비밀번호 재설정을 위해 메일을 확인해주세요.',
                [
                  {
                    onPress: () => {
                      navigation.navigate('Login');
                    },
                  },
                ]
              );
            } else if (result[1] === 'auth/user-not-found') {
              Alert.alert(
                '비밀번호 재설정 에러',
                '사용자 정보가 없습니다. 회원가입 해주세요.',
                [
                  {
                    onPress: () => {
                      navigation.navigate('Register');
                    },
                  },
                ]
              );
            } else {
              Alert.alert('비밀번호 재설정 에러', result[2]);
            }
          });
        } catch (e) {
          Alert.alert('비밀번호 재설정 에러', e.message);
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
            <IconWrapper>
              <Icon
                name="left"
                size={20}
                color="#707070"
                title="Login"
                onPress={() => navigation.navigate('Login')}
              />
            </IconWrapper>
            <PageTitle>비밀번호 찾기</PageTitle>
          </RowWrapper>
        </Header>
        <Body>
          <SubWrapper>
            <SubHeader>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                이메일을 입력하시면 찾을 수 있는 방법을 알려드려요.
              </CustomText>
            </SubHeader>
            <RowWrapper>
              <Input
                label="Id"
                placeholder="아이디 (KUPID 계정과 동일)"
                placeholderTextColor="#8E8E8E"
                returnKeyType="next"
                value={id}
                onChangeText={setId}
                onSubmitEditing={_handleFindPasswordBtnPress}
                onBlur={() => [
                  setId(removeWhitespace(id)),
                  setIdFocused(false),
                ]}
                onFocus={() => setIdFocused(true)}
              />
              <EmailDescription>@korea.ac.kr</EmailDescription>
            </RowWrapper>
            <ErrorText>{idError}</ErrorText>
          </SubWrapper>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper
                title="FindPassword"
                onPress={_handleFindPasswordBtnPress}
              >
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

export default FindPassword;
