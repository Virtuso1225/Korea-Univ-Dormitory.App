import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import { ProgressContext, UserContext } from '../contexts';
import { isExistNickname, updateNicknameInfo } from '../firebase';
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
import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { ErrorText } from '../register/RegisterStyle';
import { removeWhitespace } from '../utils';

const NicknameInfo = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameFocused, setNicknameFocused] = useState(false);
  const refNicknameDidMount = useRef(null);

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

    return errorMsg;
  };

  const lastCheck = async () => {
    const existNickname = await isExistNicknameFunc();
    const errorMsg = await nicknameCheck(existNickname);
    setNicknameError(errorMsg);

    return existNickname;
  };

  useEffect(() => {
    if (refNicknameDidMount.current) {
      if (nicknameFocused === false) {
        lastCheck();
      }
    } else {
      refNicknameDidMount.current = true;
    }
  }, [nicknameFocused]);

  const _handleUpdateBtnPress = async () => {
    let result = true;
    await lastCheck().then((existNickname) => {
      if (!nickname || existNickname) {
        result = false;
        Alert.alert('개인정보 변경하기 에러', '닉네임 정보를 확인하세요.');
      } else {
        try {
          spinner.start();
          updateNicknameInfo(nickname);
          Alert.alert('Success!', '정보 업데이트에 성공했습니다.', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        } catch (e) {
          Alert.alert('개인정보 변경하기 에러', e.message);
        } finally {
          spinner.stop();
        }
      }
    });

    return result;
  };

  return (
    <UserContext.Consumer>
      {({ setProfileInfo, profileInfo }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BackgroundWrapper>
            <Header>
              <RowWrapper>
                <PageTitle>닉네임 변경</PageTitle>
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
                    label="Nickname"
                    returnKeyType="done"
                    defaultValue={profileInfo.nickname}
                    onChangeText={setNickname}
                    onBlur={() => [
                      setNickname(removeWhitespace(nickname)),
                      setNicknameFocused(false),
                    ]}
                    onFocus={() => setNicknameFocused(true)}
                    onSubmitEditing={async () => {
                      const result = await _handleUpdateBtnPress();
                      if (result) {
                        setProfileInfo({ ...profileInfo, nickname });
                      }
                    }}
                  />
                </RowWrapper>
                <ErrorText>{nicknameError}</ErrorText>
                <View style={styles.topShadow}>
                  <View style={styles.bottomShadow}>
                    <ButtonWrapper
                      onPress={async () => {
                        const result = await _handleUpdateBtnPress();

                        if (result) {
                          setProfileInfo({ ...profileInfo, nickname });
                        }
                      }}
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
              </SelectionWrapper>
            </Body>
          </BackgroundWrapper>
        </TouchableWithoutFeedback>
      )}
    </UserContext.Consumer>
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
export default NicknameInfo;
