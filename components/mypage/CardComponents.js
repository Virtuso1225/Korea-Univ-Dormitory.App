import React, { useState } from 'react';
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
} from './CardComponentsStyle';
import Icon from 'react-native-vector-icons/AntDesign';

const CardComponents = () => {
  const [temperature, setTemperature] = useState(true);
  return (
    <ColumnWrapper>
      <TopRowWrapper>
        <TemperatureIcon />
        <ButtonText>체온기록</ButtonText>
        <Icon
          name="exclamationcircle"
          size={15}
          color="#FF0000"
          style={{ marginLeft: 10, display: temperature ? 'flex' : 'none' }}
        />
        <ErrorText visible={temperature}>오늘의 체온을 기록해주세요!</ErrorText>
      </TopRowWrapper>
      <RowWrapper>
        <PenaltyIcon />
        <ButtonText>벌점 내역</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <FacilityIcon />
        <ButtonText>최근 예약 내역</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <PersonalInfoIcon />
        <ButtonText>개인정보 변경하기</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <LogoutIcon />
        <ButtonText>로그아웃</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <DeleteIcon />
        <ButtonText>탈퇴하기</ButtonText>
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default CardComponents;
