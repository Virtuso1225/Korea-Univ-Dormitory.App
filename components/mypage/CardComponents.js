import React from 'react';
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
} from './CardComponentsStyle';

const CardComponents = () => {
  return (
    <ColumnWrapper>
      <TopRowWrapper>
        <TemperatureIcon />
        <ButtonText>체온기록</ButtonText>
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
