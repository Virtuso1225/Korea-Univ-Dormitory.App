import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { getMyPenalty } from '../firebase';
import { Header, PageTitle } from './MypageStyle';
import { Background, Card, CustomText } from '../notice/NoticeStyle';
import PenaltyList from '../../assets/PenaltyList';
import {
  CloseWrapper,
  Body,
  RowWrapper,
  PenatlyRow,
  TableContainer,
  BottomWrapper,
  TextWrapper,
  PenaltyInfoWrapper,
} from './MyPenaltyStyle';

const PenatlyInfo = ({ navigation }) => {
  return (
    <Background>
      <Card value={1}>
        <Header>
          <RowWrapper>
            <PageTitle>벌점 관련 수칙</PageTitle>
            <CloseWrapper onPress={() => navigation.goBack()}>
              <Icon name="close" size={20} color="#707070" />
            </CloseWrapper>
          </RowWrapper>
        </Header>
      </Card>
      <Body>
        <Card value={1}>
          <ScrollView>
            <BottomWrapper>
              <CustomText font="Medium" color="#1D1D1D" size="13">
                벌점 관련 안암학사 사생 수칙
              </CustomText>
              <TextWrapper>
                {'\n'}① 사감장은 벌점을 받은 사생에게 다음과 같은 처분을 할 수
                있다. {'\n'}다만, 벌점은 누진제(1, 2학기 포함)로 계산한다.
                {'\n'}
                {'\n'}1. 경고처분 : {'\n'}벌점이 5점인 경우 또는 1회 범칙행위에
                대해서도 그 정도가 무거울 경우 {'\n'}
                {'\n'}2. 퇴사처분 :{'\n'}
                가. 안암학사규정 제17조에 열거한 퇴사처분에 해당되는 범칙행위{' '}
                {'\n'}나. 경고처분 후 벌점 2점 이상을 추가하였을 경우{'\n'}
                다. 벌점이 7점 이상인 자
              </TextWrapper>
              <TableContainer>
                <CustomText font="Medium" color="#1D1D1D" size="13">
                  안암학사 사생 벌점 기준표
                </CustomText>
                {PenaltyList.map((content) => (
                  <PenatlyRow key={content.id}>
                    <CustomText font="Regular" size="11" color="#707070">
                      {content.id}
                    </CustomText>
                    <PenaltyInfoWrapper>
                      <CustomText font="Regular" size="11" color="#707070">
                        {content.content}
                      </CustomText>
                    </PenaltyInfoWrapper>
                    <CustomText font="Regular" size="11" color="#707070">
                      {content.penalty}
                    </CustomText>
                  </PenatlyRow>
                ))}
              </TableContainer>
            </BottomWrapper>
          </ScrollView>
        </Card>
      </Body>
    </Background>
  );
};

export default PenatlyInfo;
