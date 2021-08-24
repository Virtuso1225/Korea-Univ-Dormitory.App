import React, { useState, useContext, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ProgressContext, UserContext } from '../contexts';
import { isExistNickname, updateNicknameInfo } from '../firebase';
import {
  SubHeader,
  SelectionWrapper,
  ButtonWrapper,
  Input,
} from './DormInfoStyle';
import { BackgroundWrapper, Body, RowWrapper } from './DropOutStyle';
import { CustomText } from './ModalComponentStyle';
import { ErrorText } from '../register/RegisterStyle';
import { removeWhitespace } from '../utils';
import ShadowGenerator from '../theme/ShadowGenerator';
import MypageHeader from '../mypageheader/MypageHeader';

const NicknameInfo = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { profileInfo, setProfileInfo } = useContext(UserContext);

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
    await lastCheck().then((existNickname) => {
      if (!nickname || existNickname) {
        Alert.alert('개인정보 변경하기 에러', '닉네임 정보를 확인하세요.');
      } else {
        try {
          spinner.start();
          updateNicknameInfo(nickname);
          setProfileInfo({ ...profileInfo, nickname });
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
  };

  const closeHandler = () => {
    navigation.goBack();
  };

  return (
    <UserContext.Consumer>
      {({ profileInfo }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BackgroundWrapper>
            <MypageHeader pageInfo="닉네임 변경" handler={closeHandler} />
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
                    onSubmitEditing={_handleUpdateBtnPress}
                  />
                </RowWrapper>
                <ErrorText>{nicknameError}</ErrorText>
                <ShadowGenerator>
                  <ButtonWrapper onPress={_handleUpdateBtnPress}>
                    <CustomText
                      font="Medium"
                      size={responsiveScreenFontSize(1.8)}
                      color="#1D1D1D"
                    >
                      완료
                    </CustomText>
                  </ButtonWrapper>
                </ShadowGenerator>
              </SelectionWrapper>
            </Body>
          </BackgroundWrapper>
        </TouchableWithoutFeedback>
      )}
    </UserContext.Consumer>
  );
};

export default NicknameInfo;
