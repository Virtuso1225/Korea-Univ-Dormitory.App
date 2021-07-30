import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import Close from 'react-native-vector-icons/EvilIcons';
import { comparePassword, deactivate } from '../firebase';
import { Header, PageTitle } from './MypageStyle';
import { UserContext, ProgressContext } from '../contexts';
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
import { CustomText } from './ModalComponentStyle';

const DropOut = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [ischecked, setIschecked] = useState(false);
  const [isdifferent, setIsdifferent] = useState(false);
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const refPasswordDidMount = useRef(null);
  const refPassword = useRef(null);

  // // useEffect(() => {

  // //   // console.log('isFocused:', refPassword.current?.isFocused());
  // // }, [password]);
  // if (refPassword.current) {
  //   if (!isFocused) {
  //     setIsFocused(true);
  //   }
  // } else if (!refPassword.current) {
  //   if (isFocused) {
  //     setIsFocused(false);
  //   }
  // }

  // console.log('isFocused:', refPassword.current?.isFocused());

  // useEffect(() => {
  //   if (refPasswordDidMount.current) {
  //     if (!refPassword.current.isFocused()) {
  //       if (!comparePassword(password)) {
  //         setIsdifferent(true);
  //       } else {
  //         setIsdifferent(false);
  //       }
  //       console.log('isDiff:', isdifferent);
  //     }
  //   } else {
  //     refPasswordDidMount.current = true;
  //   }
  // }, [isFocused]);

  const _handleDeactivateBtnPress = async () => {
    if (!ischecked) {
      Alert.alert('Deactivation Error', '회원 탈퇴 약관에 동의해주세요.');
    } else if (!isdifferent) {
      Alert.alert('Deactivation Error', '비밀번호를 확인하세요.');
    } else {
      Alert.alert(
        '탈퇴 경고',
        '정말 탈퇴하시겠습니까?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
                spinner.start();
                await deactivate();
              } catch (e) {
                Alert.alert('Deactivation Error', '에러 발생');
              } finally {
                setUser({});
                spinner.stop();
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
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
              <Check onPress={() => setIschecked(!ischecked)}>
                {ischecked && <Icon name="check" size={18} color="#1D1D1D" />}
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
              // onPress={setIsFocused(true)}
              // different={isdifferent}
              returnKeyType="done"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={_handleDeactivateBtnPress}
            />
            <ErrorText visible={isdifferent}>
              *잘못 입력된 비밀번호입니다.
            </ErrorText>
          </PasswordCheck>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper
                title="Deactiviate"
                onPress={_handleDeactivateBtnPress}
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
});
export default DropOut;
