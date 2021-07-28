import React, { useContext, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext, ProgressContext } from '../contexts';
import { signout, deactivate } from '../firebase';
import {
  DeleteIcon,
  FacilityIcon,
  LogoutIcon,
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

const CardComponents = () => {
  const { spinner } = useContext(ProgressContext);
  const { setUser } = useContext(UserContext);
  const [temperature, setTemperature] = useState('36.2');
  const [penalty, setPenalty] = useState('1');

  return (
    <ColumnWrapper>
      <TopRowWrapper>
        <TemperatureIcon />
        <ButtonText>체온기록</ButtonText>
        <Icon
          name="exclamationcircle"
          size={15}
          color="#FF0000"
          style={{
            marginLeft: 10,
            display: temperature === '' ? 'flex' : 'none',
          }}
        />
        <ErrorText visible={temperature}>오늘의 체온을 기록해주세요!</ErrorText>
        <DescriptionText font="Regular" visible={temperature}>
          #오늘의 체온:
        </DescriptionText>
        <DescriptionText font="ExtraBold" visible={temperature}>
          {temperature}℃
        </DescriptionText>
        <DescriptionText font="Regular" visible={temperature}>
          #오늘의 외박여부:
        </DescriptionText>
      </TopRowWrapper>
      <RowWrapper>
        <PenaltyIcon />
        <ButtonText>벌점 내역</ButtonText>
        <DescriptionText font="Regular" visible={penalty}>
          #현재 나의 벌점 내역:
        </DescriptionText>
        <DescriptionText font="ExtraBold" visible={penalty}>
          {penalty}
        </DescriptionText>
      </RowWrapper>
      <RowWrapper>
        <FacilityIcon />
        <ButtonText>최근 예약 내역</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <PersonalInfoIcon />
        <ButtonText>개인정보 변경하기</ButtonText>
      </RowWrapper>
      <RowWrapper
        title="Sign out"
        onPress={async () =>
          Alert.alert(
            '로그아웃',
            '정말 로그아웃하시겠습니까?',
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
                    await signout();
                  } catch (e) {
                    Alert.alert('signout error', '에러 발생');
                  } finally {
                    setUser({});
                    spinner.stop();
                  }
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <LogoutIcon />
        <ButtonText>로그아웃</ButtonText>
      </RowWrapper>
      <RowWrapper
        title="Deactivation"
        onPress={() =>
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
                    Alert.alert('deactivate error', '에러 발생');
                  } finally {
                    setUser({});
                    spinner.stop();
                  }
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <DeleteIcon />
        <ButtonText>탈퇴하기</ButtonText>
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default CardComponents;
