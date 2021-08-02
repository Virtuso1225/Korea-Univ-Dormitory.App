import React, { useState, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
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
import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { ErrorText } from '../register/RegisterStyle';

const PasswordInfo = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [check, setCheck] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [checkError, setCheckError] = useState('');
  const refOldPassword = useRef(null);
  const refNewPassword = useRef(null);
  const refCheck = useRef(null);
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
                isPassword
                onSubmitEditing={() => refNewPassword.current.focus()}
                onBlur={() => setOldPassword(removeWhitespace(oldPassword))}
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
                onBlur={() => setNewPassword(removeWhitespace(newPassword))}
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
                onBlur={() => setCheck(removeWhitespace(check))}
                secureTextEntry
              />
            </RowWrapper>
            <ErrorText>{checkError}</ErrorText>
            <View style={styles.topShadow}>
              <View style={styles.bottomShadow}>
                <ButtonWrapper onPress={() => navigation.goBack()}>
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
