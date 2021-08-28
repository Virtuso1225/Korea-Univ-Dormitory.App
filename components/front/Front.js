import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Entypo';
import {
  signin,
  getCurrentUser,
  getNotice,
  getMyPenalty,
  getMyTemperature,
  getMyStayOut,
} from '../firebase';
import { validateEmail, removeWhitespace, validateEmailDomain } from '../utils';
import { UserContext, ProgressContext } from '../contexts';
import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  Input,
  BottomWrapper,
  // CheckWrapper,
  // Check,
  // Description,
  TextArea,
  Greeting,
  Separate,
  Titles,
  ErrorText,
  RowWrapper,
  BackgroundWrapper,
} from './FrontStyle';
import { CrimsonLogo, UnderLine, VerticalLince } from '../../assets/Svgs';
import ShadowGenerator from '../theme/ShadowGenerator';
import CustomText from '../theme/CustomTextStyle';
import LoginRegisterButton from '../button/LoginRegisterButton';

const Front = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const refPassword = useRef(null);
  const refEmailDidMount = useRef(null);
  const [emailFocused, setEmailFocused] = useState(false);
  // const [isSelected, setSelection] = useState(false);
  const {
    setProfileInfo,
    setNotice,
    setMyPenalty,
    setOvernightDate,
    setTemperature,
    setUser,
  } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const emailCheck = async () => {
    let errorMsg = '';
    if (!email) {
      errorMsg = '* 이메일은 필수 항목입니다.';
    } else if (!validateEmail(email)) {
      errorMsg = '* 이메일 형식을 확인하세요';
    } else if (!validateEmailDomain(email)) {
      errorMsg = '* 학교 도메인 이메일을 사용해주세요';
    }

    setErrorMessage(errorMsg);

    return errorMsg;
  };

  useEffect(() => {
    if (refEmailDidMount.current) {
      if (emailFocused === false) {
        emailCheck();
      }
    } else {
      refEmailDidMount.current = true;
    }
  }, [emailFocused]);

  useEffect(() => {
    setPassword(removeWhitespace(password));
  }, [password]);

  const setGlobalInfo = () => {
    return Promise.all([
      getCurrentUser(),
      getNotice(),
      getMyPenalty(),
      getMyTemperature(),
      getMyStayOut(),
    ]);
  };

  const _handleSigninBtnPress = async () => {
    const emailError = await emailCheck();
    if (!email) {
      Alert.alert('로그인 에러', '이메일은 필수 항목 입니다.');
    } else if (emailError) {
      Alert.alert('로그인 에러', '이메일을 확인하세요.');
    } else if (!password) {
      Alert.alert('로그인 에러', '비밀번호는 필수 항목 입니다.');
    } else {
      try {
        spinner.start();
        const user = await signin({ email, password });
        setUser(user);
        const result = await setGlobalInfo().then((results) => {
          setNotice(results[1]);
          setMyPenalty(results[2]);
          setTemperature(results[3]);
          setOvernightDate(results[4]);
          return [results[0], results[2]];
        });

        const sum = { myPenaltySum: 0 };
        result[1].forEach((item, index) => {
          sum.myPenaltySum += item.points;
        });
        setProfileInfo({ ...result[0], ...sum });
      } catch (e) {
        Alert.alert('로그인 에러', e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <TitleWrapper>
          <Separate>
            <CrimsonLogo />
            <Titles>
              <HeadTitle>고려대학교</HeadTitle>
            </Titles>
          </Separate>
          <SubTitle>안암학사</SubTitle>
          <UnderLine />
          <Greeting>고려대학교 안암학사에 오신 것을 환영합니다.</Greeting>
        </TitleWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TextArea>
            <Input
              label="Email"
              placeholder="아이디 (KUPID 계정)"
              placeholderTextColor="#515151"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => refPassword.current.focus()}
              onBlur={() => [
                setEmail(removeWhitespace(email)),
                setEmailFocused(false),
              ]}
              onFocus={() => setEmailFocused(true)}
            />
            <Input
              ref={refPassword}
              label="Password"
              placeholder="비밀번호"
              placeholderTextColor="#515151"
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={_handleSigninBtnPress}
              secureTextEntry
            />
            {/* <CheckWrapper>
              <TouchableOpacity onPress={() => setSelection(!isSelected)}>
                <Check>
                  {isSelected && (
                    <Icon name="check" size={25} color="#850000" />
                  )}
                </Check>
              </TouchableOpacity>
              <Description>Keep me logged in</Description>
            </CheckWrapper> */}
            <ErrorText>{errorMessage}</ErrorText>
          </TextArea>
        </KeyboardAvoidingView>
        <BottomWrapper>
          <LoginRegisterButton text="로그인" handler={_handleSigninBtnPress} />
          <RowWrapper>
            <Pressable onPress={() => navigation.navigate('FindPassword')}>
              <CustomText font="Regular" size={12.5} color="#828282">
                비밀번호 찾기
              </CustomText>
            </Pressable>
            <VerticalLince />
            <Pressable onPress={() => navigation.navigate('Register')}>
              <CustomText font="Regular" size={12.5} color="#828282">
                회원가입
              </CustomText>
            </Pressable>
          </RowWrapper>
        </BottomWrapper>
      </BackgroundWrapper>
    </TouchableWithoutFeedback>
  );
};

export default Front;
