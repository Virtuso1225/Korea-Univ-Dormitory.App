import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
  Modal,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import Close from 'react-native-vector-icons/EvilIcons';
import { comparePassword, deactivate } from '../firebase';
import { Header, PageTitle } from './MypageStyle';
import { UserContext, ProgressContext } from '../contexts';
import {
  CenterView,
  ModalWrapper,
  CustomText,
  Button,
} from './ModalComponentStyle';
import {
  CloseWrapper,
  BackgroundWrapper,
  Body,
  Check,
  CheckWrapper,
  Guidance,
  GuidanceWrapper,
  RowWrapper,
  PasswordCheck,
  Password,
  ButtonWrapper,
  ErrorText,
} from './DropOutStyle';

const DropOut = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [isChecked, setIsChecked] = useState(false);
  const [isDifferent, setIsDifferent] = useState(false);
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  // const isDifferent = false;

  const refPasswordDidMount = useRef(null);
  const refPassword = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const comparePasswordFunc = async (callback) => {
    spinner.start();
    const isDiff = await comparePassword(password);
    setIsDifferent(isDiff);
    sleep();
    spinner.stop();

    if (isDiff === isDifferent) {
      callback();
    } else {
      setIsDifferent(isDiff);
      callback();
    }
  };

  useEffect(() => {
    if (refPasswordDidMount.current) {
      if (isFocused === false) {
        comparePasswordFunc(sleep);
      }
    } else {
      refPasswordDidMount.current = true;
    }
  }, [isFocused]);

  const sleep = () => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + 200);
  };

  const conditionCheck = () => {
    if (isDifferent) {
      Alert.alert('Deactivation Error', '비밀번호를 확인하세요.');
    } else {
      setModalVisible(true);
    }
  };

  const _handleDeactivateBtnPress = () => {
    setIsFocused(false);
    sleep(1000);
    if (!isChecked) {
      Alert.alert('Deactivation Error', '회원 탈퇴 약관에 동의해주세요.');
    } else {
      setTimeout(() => {
        spinner.stop();
        console.log('isDifferent', isDifferent);
        conditionCheck();
      }, 1000);
    }
  };

  const deactiveSpinner = async () => {
    spinner.start();
    await deactivate();
    spinner.stop();
    setUser({});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <Header>
          <RowWrapper>
            <PageTitle marginTop={0} marginLeft={0}>
              회원 탈퇴하기
            </PageTitle>
            <CloseWrapper onPress={() => navigation.navigate('Mypage')}>
              <Close name="close" size={20} color="#707070" />
            </CloseWrapper>
          </RowWrapper>
        </Header>

        <Body>
          <GuidanceWrapper>
            <CustomText
              font="Medium"
              size={responsiveScreenFontSize(1.8)}
              color="#1D1D1D"
            >
              회원 탈퇴 안내
            </CustomText>
            <Guidance>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                [회원 탈퇴 약관]{'\n'}
              </CustomText>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                회원탈퇴 신청 전 안내 사항을 확인 해 주세요.
              </CustomText>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                회원탈퇴를 신청하시면 현재 로그인 된 아이디는 사용하실 수
                없습니다.
              </CustomText>
              <CustomText
                font="Regular"
                size={responsiveScreenFontSize(1.5)}
                color="#707070"
              >
                회원탈퇴를 하더라도, 서비스 약관 및 개인정보 취급방침 동의하에
                따라 일정 기간동안 회원 개인정보를 보관합니다.
              </CustomText>
            </Guidance>
            <CheckWrapper>
              <Check onPress={() => setIsChecked(!isChecked)}>
                {isChecked && <Icon name="check" size={18} color="#1D1D1D" />}
              </Check>
              <CustomText
                font="Medium"
                size={responsiveScreenFontSize(1.5)}
                color="#404040"
              >
                안내 사항을 모두 확인하였으며, 이에 동의합니다.
              </CustomText>
            </CheckWrapper>
          </GuidanceWrapper>
          <PasswordCheck>
            <CustomText
              font="Medium"
              size={responsiveScreenFontSize(1.8)}
              color="#1D1D1D"
            >
              비밀번호 확인
            </CustomText>
            <Password
              ref={refPassword}
              label="Password"
              placeholder="기존 비밀번호를 입력해주세요."
              placeholderTextColor="#707070"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={() => setIsFocused(false)}
              secureTextEntry
            />
            <ErrorText visible={isDifferent}>
              *잘못 입력된 비밀번호입니다.
            </ErrorText>
          </PasswordCheck>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper
                title="Deactiviate"
                onPress={_handleDeactivateBtnPress}
                // setModalVisible(true)
              >
                <CustomText
                  font="Medium"
                  size={responsiveScreenFontSize(1.8)}
                  color="#1D1D1D"
                >
                  탈퇴하기
                </CustomText>
              </ButtonWrapper>
            </View>
          </View>
          <View>
            <Modal
              animationType="fade"
              transparent
              visible={modalVisible && !isDifferent}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <CenterView>
                <ModalWrapper>
                  <CustomText
                    size={responsiveScreenFontSize(1.72)}
                    font="Medium"
                    color="#1D1D1D"
                  >
                    탈퇴
                  </CustomText>
                  <CustomText
                    size={responsiveScreenFontSize(1.29)}
                    font="Medium"
                    color="#404040"
                  >
                    정말 탈퇴 하시겠습니까?
                  </CustomText>
                  <Button color="#850000" onPress={deactiveSpinner}>
                    <CustomText
                      size={responsiveScreenFontSize(1.5)}
                      font="Medium"
                      color="#FEFCF9"
                    >
                      탈퇴하기
                    </CustomText>
                  </Button>
                  <Button
                    color="#FFFDF9"
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <CustomText
                      size={responsiveScreenFontSize(1.5)}
                      font="Medium"
                      color="#850000"
                    >
                      닫기
                    </CustomText>
                  </Button>
                </ModalWrapper>
              </CenterView>
            </Modal>
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
});
export default DropOut;
