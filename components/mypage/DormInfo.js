import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import { SubHeader, SelectionWrapper, Input2 } from './DormInfoStyle';
import { BackgroundWrapper, Body, RowWrapper } from './DropOutStyle';
import { UserContext, ProgressContext } from '../contexts';
import { ColumnWrapper, ErrorText } from '../register/RegisterStyle';
import { removeWhitespace, validateRoom } from '../utils';
import { getStudentInfo, updateDormInfo } from '../firebase';
import MypageHeader from '../mypageheader/MypageHeader';
import SubmitButton from '../button/SubmitButton';
import CustomText from '../theme/CustomTextStyle';

const DormInfo = ({ navigation }) => {
  const dorms = [
    '학생동 (구관-남자동)',
    '학생동(구관-여자동)',
    '프런티어관(신관-남자동)',
    '프런티어관(신관-여자동)',
  ];
  const { spinner } = useContext(ProgressContext);
  const { profileInfo, setProfileInfo } = useContext(UserContext);

  const [dorm, setDorm] = useState(profileInfo.dorm);
  const [room, setRoom] = useState(profileInfo.room);

  const [roomError, setRoomError] = useState('');
  const [roomFocused, setRoomFocused] = useState(false);

  const refRoomDidMount = useRef(null);

  const roomCheck = async () => {
    let errorMsg = '';

    if (!room) {
      errorMsg = '*필수 항목입니다.';
    } else if (room && !validateRoom(room)) {
      errorMsg = '* 양식을 맞춰주세요. ex) 245-1';
    }

    setRoomError(errorMsg);

    return errorMsg;
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

  const setStudentInfoFunc = async (sid) => {
    const getStudentInfoChart = await getStudentInfo(sid * 1);

    return getStudentInfoChart;
  };

  const compareCheck = async () => {
    const studentInfoChart = await setStudentInfoFunc(profileInfo.sid);

    let compareStudentInfo = true;
    if (studentInfoChart.dorm !== dorm || studentInfoChart.room !== room) {
      compareStudentInfo = false;
    }

    return compareStudentInfo;
  };

  const lastCheck = () => {
    return Promise.all([roomCheck(), compareCheck()]);
  };

  const _handleUpdateBtnPress = async () => {
    await lastCheck().then((results) => {
      const roomError = results[0];
      const compareStudentInfo = results[1];

      if (roomError) {
        Alert.alert('개인정보 변경하기 에러', '호실 정보를 확인하세요.');
      } else if (!compareStudentInfo) {
        Alert.alert(
          '개인정보 변경하기 에러',
          '학생정보를 확인하세요. 정보가 올바르다면 관리자에게 문의하세요.'
        );
      } else {
        try {
          spinner.start();
          updateDormInfo(dorm, room);
          setProfileInfo({ ...profileInfo, dorm, room });
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
            <MypageHeader pageInfo="소속 동/호실 변경" handler={closeHandler} />
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
                      defaultValueByIndex={profileInfo.dorm}
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
                  </ColumnWrapper>
                  <ColumnWrapper>
                    <Input2
                      label="Room"
                      returnKeyType="done"
                      value={room}
                      onChangeText={setRoom}
                      onBlur={() => [
                        setRoom(removeWhitespace(room)),
                        setRoomFocused(false),
                      ]}
                      onFocus={() => setRoomFocused(true)}
                      onSubmitEditing={_handleUpdateBtnPress}
                      error={roomError}
                    />
                    <ErrorText>{roomError}</ErrorText>
                  </ColumnWrapper>
                </RowWrapper>
                <SubmitButton handler={_handleUpdateBtnPress} />
              </SelectionWrapper>
            </Body>
          </BackgroundWrapper>
        </TouchableWithoutFeedback>
      )}
    </UserContext.Consumer>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: responsiveScreenWidth(41.7),
    height: 24,
    borderBottomWidth: 1,
    borderColor: '#CBCCCE',
    backgroundColor: '#f9f7f4',
    paddingBottom: 8,
  },
  buttonTextStyle: {
    fontSize: responsiveScreenFontSize(1.5),
    width: responsiveScreenWidth(41.7),
    textAlign: 'left',
    color: '#515151',
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
    color: '#515151',
  },
});

export default DormInfo;
