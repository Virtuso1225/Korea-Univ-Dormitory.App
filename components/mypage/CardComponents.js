import React from 'react';
import { TemperatureIcon } from '../../assets/Svgs';
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
        <TemperatureIcon />
        <ButtonText>벌점 내역</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <TemperatureIcon />
        <ButtonText>최근 예약 내역</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <TemperatureIcon />
        <ButtonText>개인정보 변경하기</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <TemperatureIcon />
        <ButtonText>로그아웃</ButtonText>
      </RowWrapper>
      <RowWrapper>
        <TemperatureIcon />
        <ButtonText>탈퇴하기</ButtonText>
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default CardComponents;
