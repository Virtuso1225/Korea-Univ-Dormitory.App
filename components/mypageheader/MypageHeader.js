import React from 'react';
import Close from 'react-native-vector-icons/EvilIcons';
import styled from 'styled-components/native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { CloseWrapper, RowWrapper } from '../mypage/DropOutStyle';

const PageTitle = styled.Text`
  font-size: ${responsiveScreenFontSize(2.15)}px;
  font-family: Bold6;
  color: black;
`;

const Header = styled.View`
  height: ${responsiveScreenHeight(11.84)}px;
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
`;

const MypageHeader = ({ pageInfo, handler }) => {
  return (
    <Header>
      <RowWrapper>
        <PageTitle>{pageInfo}</PageTitle>
        <CloseWrapper onPress={handler}>
          <Close name="close" size={23} color="#707070" />
        </CloseWrapper>
      </RowWrapper>
    </Header>
  );
};

export default MypageHeader;
