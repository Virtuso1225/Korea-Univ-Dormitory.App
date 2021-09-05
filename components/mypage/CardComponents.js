import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { UserContext, ProgressContext } from '../contexts';
import { signout } from '../firebase';
import {
  DeleteIcon,
  PenaltyIcon,
  PersonalInfoIcon,
  TemperatureIcon,
} from '../../assets/Svgs';
import {
  ButtonText,
  ColumnWrapper,
  RowWrapper,
  ErrorText,
  DescriptionText,
} from './CardComponentsStyle';
import ModalComponent from './ModalComponent';
import PreparingFacilityModal from './PreparingFacilityModal';

const CardComponents = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { setUser, setProfileInfo, setMyPenalty, setNotice } =
    useContext(UserContext);

  const toTimestamp = (inputDate) => {
    const arr = inputDate.split('-');
    const timestamp = arr[0] + arr[1] + arr[2];

    return timestamp;
  };

  const [todayNow, setTodayNow] = useState(String(moment().format('YYYYMMDD')));

  const [todayFormat, setTodayFormat] = useState(moment().format('YYYY-MM-DD'));

  const getTime = () => {
    setTodayNow(String(moment().format('YYYYMMDD')));
    setTodayFormat(moment().format('YYYY-MM-DD'));
  };

  useEffect(() => {
    getTime();
    setInterval(getTime, 1000);
  }, []);

  const Signout = async () => {
    try {
      spinner.start();
      signout();
    } catch (e) {
      Alert.alert('로그아웃 에러', '다시 시도하세요.');
    } finally {
      setUser({});
      setProfileInfo({});
      setMyPenalty({});
      setNotice({});

      spinner.stop();
    }
  };

  return (
    <UserContext.Consumer>
      {({ profileInfo, temperature, overnightDate }) => (
        <ColumnWrapper>
          <RowWrapper onPress={() => navigation.navigate('Calendar')}>
            <TemperatureIcon />
            <ButtonText>체온기록</ButtonText>
            <Icon
              name="exclamationcircle"
              size={15}
              color="#850000"
              style={{
                marginLeft: 10,
                display:
                  temperature[todayFormat] === undefined ? 'flex' : 'none',
              }}
            />
            <ErrorText visible={temperature[todayFormat] === undefined}>
              오늘의 체온을 기록해주세요!
            </ErrorText>
            <DescriptionText
              font="Regular"
              visible={temperature[todayFormat] !== undefined}
            >
              #오늘의 체온:
            </DescriptionText>
            <DescriptionText
              font="ExtraBold"
              visible={temperature[todayFormat] !== undefined}
            >
              {temperature[todayFormat]}°C
            </DescriptionText>
            <DescriptionText font="Regular" visible={overnightDate}>
              #오늘의 외박여부:
            </DescriptionText>
            <DescriptionText
              font="ExtraBold"
              visible={
                toTimestamp(overnightDate.endDate) >= todayNow &&
                todayNow >= toTimestamp(overnightDate.startDate)
              }
            >
              O
            </DescriptionText>
            <DescriptionText
              font="ExtraBold"
              visible={
                !(
                  toTimestamp(overnightDate.endDate) >= todayNow &&
                  todayNow >= toTimestamp(overnightDate.startDate)
                )
              }
            >
              X
            </DescriptionText>
          </RowWrapper>
          <RowWrapper onPress={() => navigation.navigate('MyPenalty')}>
            <PenaltyIcon />
            <ButtonText>벌점 내역</ButtonText>
            <DescriptionText font="Regular" visible={profileInfo}>
              #현재 나의 벌점 내역:
            </DescriptionText>
            <DescriptionText font="ExtraBold" visible={profileInfo}>
              {profileInfo.myPenaltySum}점
            </DescriptionText>
          </RowWrapper>
          <PreparingFacilityModal />
          <RowWrapper onPress={() => navigation.navigate('PersonalInfo')}>
            <PersonalInfoIcon />
            <ButtonText>개인정보 변경하기</ButtonText>
          </RowWrapper>
          <ModalComponent handlePress={Signout} />
          <RowWrapper onPress={() => navigation.navigate('Dropout')}>
            <DeleteIcon />
            <ButtonText>탈퇴하기</ButtonText>
          </RowWrapper>
        </ColumnWrapper>
      )}
    </UserContext.Consumer>
  );
};

export default CardComponents;
