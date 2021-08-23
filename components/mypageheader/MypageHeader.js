import React from 'react';
import Close from 'react-native-vector-icons/EvilIcons';
import { Header, PageTitle } from '../mypage/MypageStyle';
import { CloseWrapper, RowWrapper } from '../mypage/DropOutStyle';

const MypageHeader = ({ pageInfo, handler }) => {
  return (
    <Header>
      <RowWrapper>
        <PageTitle>{pageInfo}</PageTitle>
        <CloseWrapper onPress={handler}>
          <Close name="close" size={20} color="#707070" />
        </CloseWrapper>
      </RowWrapper>
    </Header>
  );
};

export default MypageHeader;
