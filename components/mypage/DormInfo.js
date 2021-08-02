import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Close from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import { SubHeader, SelectionWrapper, ButtonWrapper } from './DormInfoStyle';
import {
  BackgroundWrapper,
  Body,
  RowWrapper,
  CloseWrapper,
} from './DropOutStyle';
import { UserContext, ProgressContext } from '../contexts';
import { CustomText } from './ModalComponentStyle';
import { Header, PageTitle } from './MypageStyle';
import { ColumnWrapper, ErrorText, Input2 } from '../register/RegisterStyle';
import { dorms, removeWhitespace, validateRoom } from '../utils';
import { getCurrentUser, getStudentInfo, updateDormInfo } from '../firebase';

const DormInfo = ({ navigation }) => {
  const dorms = [
    '학생동(구관-남자동)',
    '학생동(구관-여자동)',
    '프런티어관(신관-남자동)',
    '프런티어관(신관-여자동)',
  ];
  const { spinner } = useContext(ProgressContext);
  const [userInfo, setUserInfo] = useState({
    dorm: '',
    room: '',
    sid: '',
  });

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    dorm: '',
    room: '',
    sid: '',
  });

  const [dorm, setDorm] = useState('');
  const [room, setRoom] = useState('');
  const [sid, setSid] = useState('');

  const [dormError, setDormError] = useState('');
  const [roomError, setRoomError] = useState('');

  const [dormFocused, setDormFocused] = useState(false);
  const [roomFocused, setRoomFocused] = useState(false);
  const [compareStudentInfo, setCompareStudentInfo] = useState(false);

  const refRoomDidMount = useRef(null);

  const setUserInfoFunc = async () => {
    setUserInfo(await getCurrentUser());
  };

  useEffect(() => {
    spinner.start();
    setUserInfoFunc();
    spinner.stop();
  }, [UserContext, ProgressContext]);

  useEffect(() => {
    spinner.start();
    setRoom(userInfo.room);
    setDorm(userInfo.dorm);
    setSid(userInfo.sid);
    spinner.stop();
  }, [userInfo]);

  const setStudentInfoFunc = async () => {
    setStudentInfo(await getStudentInfo(sid * 1));
    console.log('sid', studentInfo);
  };

  useEffect(() => {
    if (sid !== '') {
      setStudentInfoFunc();
    }
  }, [sid]);

  const roomCheck = () => {
    if (!room) {
      setRoomError('*필수 항목입니다.');
    } else if (room && !validateRoom(room)) {
      setRoomError('* 양식을 맞춰주세요. ex) 245-1');
    } else {
      setRoomError('');
    }
  };

  const compareCheck = () => {
    if (studentInfo.dorm !== dorm) {
      setCompareStudentInfo(false);
    } else if (studentInfo.room !== room) {
      setCompareStudentInfo(false);
    } else {
      setCompareStudentInfo(true);
    }
    console.log('student', studentInfo.dorm, dorm, studentInfo.room, room);
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

  useEffect(() => {
    compareCheck();
  }, [dorm, room, studentInfo]);

  const conditionCheck = async () => {
    if (!room || roomError) {
      Alert.alert('Update Error', '호실 정보를 확인하세요.');
    } else if (!compareStudentInfo) {
      Alert.alert(
        'Update Error',
        '학생정보를 확인하세요. 정보가 올바르다면 관리자에게 문의하세요.'
      );
    } else {
      try {
        spinner.start();
        await updateDormInfo(dorm, room);
        Alert.alert('Success', '정보 업데이트에 성공했습니다.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Footer', { screen: 'Home' }),
          },
        ]);
      } catch (e) {
        Alert.alert('Update Error', e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  const _handleUpdateBtnPress = () => {
    spinner.start();
    roomCheck();
    compareCheck();
    spinner.stop();

    setTimeout(function () {
      conditionCheck();
    }, 500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundWrapper>
        <Header>
          <RowWrapper>
            <PageTitle>소속 동/호실 변경</PageTitle>
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
              <ColumnWrapper>
                <SelectDropdown
                  data={dorms}
                  buttonStyle={styles.buttonStyle}
                  buttonTextStyle={styles.buttonTextStyle}
                  onSelect={(selectedItem, index) => {
                    setDorm(index);
                  }}
                  defaultValueByIndex={userInfo.dorm}
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
              <ColumnWrapper>
                <Input2
                  label="Room"
                  returnKeyType="done"
                  defaultValue={userInfo.room}
                  // value={room}
                  onChangeText={setRoom}
                  onBlur={() => [
                    setRoom(removeWhitespace(room)),
                    setRoomFocused(false),
                  ]}
                  onFocus={() => setRoomFocused(true)}
                  onSubmitEditing={_handleUpdateBtnPress}
                />
                <ErrorText>{roomError}</ErrorText>
              </ColumnWrapper>
            </RowWrapper>
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
export default DormInfo;
