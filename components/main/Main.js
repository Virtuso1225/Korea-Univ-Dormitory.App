// 로그인 기능 구현 test용
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserContext } from '../contexts';
import {
  Container,
  HeadTitle,
  SubTitle1,
  TitleWrapper,
  Logo,
  ButtonsContainer,
  ButtonWrapper,
  RowWrapper,
  StyledButton,
  ButtonRowWrapper,
  Separation,
  DateContainer,
  DateStyle,
  Temperature,
} from './MainStyle';
import { Megaphone, MypageIcon } from '../../assets/Svgs';
import PreparingFacilityUseModal from './PreparingFacilityUseModal';
import PreparingBoardModal from './PreparingBoardModal';

const Main = ({ navigation }) => {
  const date = new Date();
  const [month, day, index] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getDay() - 1,
  ];
  const week = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];
  return (
    <Container>
      <TitleWrapper>
        <RowWrapper>
          <Logo source={require('../../assets/crimson2positive.png')} />
          <HeadTitle font="Light">고려대학교</HeadTitle>
          <HeadTitle font="ExtraBold">안암학사</HeadTitle>
        </RowWrapper>
        <RowWrapper>
          <SubTitle1 font="ExtraBold">안암학사</SubTitle1>
          <SubTitle1 font="Light">에 오신 것을 환영합니다.</SubTitle1>
        </RowWrapper>
      </TitleWrapper>
      <ButtonsContainer>
        <DateContainer>
          <DateStyle>
            {month}월{day}일{week[index]}
          </DateStyle>
          <Temperature>발열체크 하셨나요?</Temperature>
        </DateContainer>
        <View style={styles.topShadow}>
          <View style={styles.bottomShadow}>
            <ButtonWrapper
              onPress={() =>
                navigation.navigate('Footer', { screen: '공지사항' })
              }
            >
              <ButtonRowWrapper>
                <Separation>
                  <Megaphone
                    widthProp={27.365}
                    heightProp={27.103}
                    colorProp="#9B1818"
                  />
                  <StyledButton>공지사항</StyledButton>
                </Separation>
                <Icon name="right" size={15} color="#484848" />
              </ButtonRowWrapper>
            </ButtonWrapper>
          </View>
        </View>
        <View style={styles.topShadow}>
          <View style={styles.bottomShadow}>
            <PreparingFacilityUseModal />
          </View>
        </View>
        <View style={styles.topShadow}>
          <View style={styles.bottomShadow}>
            <PreparingBoardModal />
          </View>
        </View>
        <View style={styles.topShadow}>
          <View style={styles.bottomShadow}>
            <ButtonWrapper
              onPress={() =>
                navigation.navigate('Footer', { screen: '마이페이지' })
              }
            >
              <ButtonRowWrapper>
                <Separation>
                  <MypageIcon
                    widthProp={24.165}
                    heightProp={26.725}
                    colorProp="#9B1818"
                    fillProp="none"
                  />
                  <StyledButton>마이페이지</StyledButton>
                </Separation>
                <Icon name="right" size={15} color="#484848" />
              </ButtonRowWrapper>
            </ButtonWrapper>
          </View>
        </View>
      </ButtonsContainer>
    </Container>
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
  fontStyle: {
    fontSize: 15,
    color: '#850000',
    fontFamily: 'NotoSans_700Bold',
  },
});

export default Main;
