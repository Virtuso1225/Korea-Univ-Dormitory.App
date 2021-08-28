import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { UserContext } from '../contexts';
import { Background, Card } from '../notice/NoticeStyle';
import {
  Body,
  TableWrapper,
  TableContainer,
  PenaltyWrapper,
  BottomWrapper,
  SmallButton,
  TextWrapper,
  ButtonRow,
} from './MyPenaltyStyle';
import ShadowGenerator from '../theme/ShadowGenerator';
import CustomText from '../theme/CustomTextStyle';
import MypageHeader from '../mypageheader/MypageHeader';

const MyPenalty = ({ navigation }) => {
  const tableHeader = [
    { id: 0, content: '날짜' },
    { id: 1, content: '벌점 부여 사유' },
    { id: 2, content: '벌점' },
  ];

  const closeHandler = () => {
    navigation.goBack();
  };

  return (
    <UserContext.Consumer>
      {({ profileInfo, myPenalty }) => (
        <Background>
          <Card value={1}>
            <MypageHeader pageInfo="내 벌점 내역" handler={closeHandler} />
          </Card>
          <Body>
            <Card value={1}>
              <ScrollView>
                <TableContainer>
                  <TableWrapper>
                    {tableHeader.map((item) => (
                      <CustomText
                        key={item.id}
                        font="Medium"
                        color="#1D1D1D"
                        size="11"
                      >
                        {item.content}
                      </CustomText>
                    ))}
                  </TableWrapper>
                  {myPenalty.map((content) => (
                    <TableWrapper key={content.index}>
                      <CustomText font="Medium" color="#707070" size="11">
                        {content.date}
                      </CustomText>
                      <CustomText font="Medium" color="#707070" size="11">
                        {content.reason}
                      </CustomText>
                      <CustomText font="Medium" color="#707070" size="11">
                        {content.points}
                      </CustomText>
                    </TableWrapper>
                  ))}
                  <PenaltyWrapper>
                    <CustomText font="Bold6" color="#1D1D1D" size="14">
                      누적 벌점 총 {profileInfo.myPenaltySum} 점
                    </CustomText>
                  </PenaltyWrapper>
                </TableContainer>
                <BottomWrapper>
                  <ShadowGenerator>
                    <SmallButton
                      onPress={() => navigation.navigate('PenaltyInfo')}
                    >
                      <ButtonRow>
                        <CustomText font="Medium" color="#707070" size="11">
                          벌점 관련 수칙 전체 보기
                        </CustomText>
                        <Icon name="chevron-right" colro="#707070" size={20} />
                      </ButtonRow>
                    </SmallButton>
                  </ShadowGenerator>
                  <TextWrapper>
                    ① 사감장은 벌점을 받은 사생에게 다음과 같은 처분을 할 수
                    있다. {'\n'}다만, 벌점은 누진제(1, 2학기 포함)로 계산한다.
                    {'\n'}
                    {'\n'}1. 경고처분 : {'\n'}벌점이 5점인 경우 또는 1회
                    범칙행위에 대해서도 그 정도가 무거울 경우 {'\n'}2. 퇴사처분
                    :{'\n'}
                    가. 안암학사규정 제17조에 열거한 퇴사처분에 해당되는
                    범칙행위 {'\n'}나. 경고처분 후 벌점 2점 이상을 추가하였을
                    경우{'\n'}
                    다. 벌점이 7점 이상인 자
                  </TextWrapper>
                </BottomWrapper>
              </ScrollView>
            </Card>
          </Body>
        </Background>
      )}
    </UserContext.Consumer>
  );
};

export default MyPenalty;
