import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { UserContext, ProgressContext } from '../contexts';
import { signout } from '../firebase';
import {
  DeleteIcon,
  FacilityIcon,
  PenaltyIcon,
  PersonalInfoIcon,
  TemperatureIcon,
} from '../../assets/Svgs';
import {
  ButtonText,
  ColumnWrapper,
  TopRowWrapper,
  RowWrapper,
  ErrorText,
  DescriptionText,
} from './CardComponentsStyle';
import ModalComponent from './ModalComponent';

const CardComponents = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { setUser, setProfileInfo, setMyPenalty, setNotice } =
    useContext(UserContext);
  const today = moment().format('YYYY-MM-DD');
  const Signout = async () => {
    try {
      spinner.start();
      signout();
    } catch (e) {
      Alert.alert('signout error', '에러 발생');
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
      {({ profileInfo, temperature }) => (
        <ColumnWrapper>
          <TopRowWrapper onPress={() => navigation.navigate('Calendar')}>
            <TemperatureIcon />
            <ButtonText>체온기록</ButtonText>
            <Icon
              name="exclamationcircle"
              size={15}
              color="#FF0000"
              style={{
                marginLeft: 10,
                display: temperature[today] === undefined ? 'flex' : 'none',
              }}
            />
            <ErrorText visible={temperature[today] === undefined}>
              오늘의 체온을 기록해주세요!
            </ErrorText>
            <DescriptionText
              font="Regular"
              visible={temperature[today] !== undefined}
            >
              #오늘의 체온:
            </DescriptionText>
            <DescriptionText
              font="ExtraBold"
              visible={temperature[today] !== undefined}
            >
              {temperature[today]}°C
            </DescriptionText>
            <DescriptionText
              font="Regular"
              visible={temperature[today] !== undefined}
            >
              #오늘의 외박여부:
            </DescriptionText>
          </TopRowWrapper>
          <RowWrapper onPress={() => navigation.navigate('MyPenalty')}>
            <PenaltyIcon />
            <ButtonText>벌점 내역</ButtonText>
            <DescriptionText font="Regular" visible={profileInfo}>
              #현재 나의 벌점 내역:
            </DescriptionText>
            <DescriptionText font="ExtraBold" visible={profileInfo}>
              {profileInfo.myPenaltySum}
            </DescriptionText>
          </RowWrapper>
          <RowWrapper>
            <FacilityIcon />
            <ButtonText>최근 예약 내역</ButtonText>
          </RowWrapper>
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
