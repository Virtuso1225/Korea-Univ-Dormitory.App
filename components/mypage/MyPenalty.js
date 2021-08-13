import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { getMyPenalty } from '../firebase';
import { Header, PageTitle } from './MypageStyle';
import { UserContext, ProgressContext } from '../contexts';
import { Background, Card, CustomText } from '../notice/NoticeStyle';

import {
  CloseWrapper,
  Body,
  RowWrapper,
  TableWrapper,
  TableContainer,
  PenaltyWrapper,
  BottomWrapper,
  SmallButton,
  TextWrapper,
  ButtonRow,
} from './MyPenaltyStyle';

const MyPenalty = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext);
  const { myPenalty } = useContext(UserContext);
  const [dataArr, setDataArr] = useState([]);
  const tableHeader = ['날짜', '벌점 부여 사유', '벌점'];
  useEffect(() => {
    let dataObj = [];
    const makeArray = async (obj) => {
      const arr = [];
      await obj.forEach((item, index) => {
        dataObj = [];
        dataObj.push(item.date);
        dataObj.push(item.reason);
        dataObj.push(item.points);
        arr.push(dataObj);
      });
      return arr;
    };
    const unsubscribe = navigation.addListener('focus', async () => {
      spinner.start();
      const dataArr = await makeArray(myPenalty);

      setDataArr(dataArr);

      spinner.stop();
    });

    return unsubscribe;
  }, [navigation, myPenalty, spinner]);

  return (
    <UserContext.Consumer>
      {({ profileInfo }) => (
        <Background>
          <Card value={1}>
            <Header>
              <RowWrapper>
                <PageTitle>벌점 내역</PageTitle>
                <CloseWrapper onPress={() => navigation.navigate('Mypage')}>
                  <Icon name="close" size={20} color="#707070" />
                </CloseWrapper>
              </RowWrapper>
            </Header>
          </Card>
          <Body>
            <Card value={1}>
              <ScrollView>
                <TableContainer>
                  <TableWrapper>
                    {tableHeader.map((title) => (
                      <CustomText
                        key={title}
                        font="Medium"
                        color="#1D1D1D"
                        size="11"
                      >
                        {title}
                      </CustomText>
                    ))}
                  </TableWrapper>
                  {myPenalty.map((content) => (
                    <TableWrapper key={content.id}>
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
                  <View style={styles.topShadow}>
                    <View style={styles.bottomShadow}>
                      <SmallButton
                        onPress={() => navigation.navigate('PenaltyInfo')}
                      >
                        <ButtonRow>
                          <CustomText font="Medium" color="#707070" size="11">
                            벌점 관련 수칙 전체 보기
                          </CustomText>
                          <Icon
                            name="chevron-right"
                            colro="#707070"
                            size={20}
                          />
                        </ButtonRow>
                      </SmallButton>
                    </View>
                  </View>
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
const styles = StyleSheet.create({
  topShadow: {
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#ffffff',
  },
  bottomShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#d4d2cf',
  },
});
export default MyPenalty;
