// 로그인 기능 구현 test용
import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import { StyleSheet, View } from 'react-native';
import { signout } from '../firebase';
import {
  Container,
  HeadTitle,
  SubTitle1,
  SubTitle2,
  TitleWrapper,
  Logo,
  ButtonsContainer,
  ButtonWrapper,
  RowWrapper,
  StyledButton,
  CharacterContainer,
  ButtonRowWrapper,
  Separation,
  DateContainer,
  DateStyle,
  Temperature,
} from './MainStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts } from '@expo-google-fonts/noto-sans-kr';
import {
  Megaphone,
  Facility,
  Board,
  Mypage,
  Character,
} from '../../assets/Svgs';
import Apploading from 'expo-app-loading';

const Main = ({ navigation, route }) => {
  const { setUser } = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    ExtraLight: require('../../fonts/SCDream2.otf'),
    Medium: require('../../fonts/SCDream5.otf'),
    Bold6: require('../../fonts/SCDream6.otf'),
  });
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
  if (!fontsLoaded) {
    return <Apploading />;
  } else {
    return (
      <Container>
        <TitleWrapper>
          <RowWrapper>
            <Logo source={require('../../assets/crimson2positive.png')} />
            <HeadTitle>고려대학교</HeadTitle>
          </RowWrapper>
          <RowWrapper>
            <SubTitle1>안암학사</SubTitle1>
            <SubTitle2>에 오신 것을 환영합니다.</SubTitle2>
          </RowWrapper>
        </TitleWrapper>
        <ButtonsContainer>
          <CharacterContainer>
            <Character />
          </CharacterContainer>
          <DateContainer>
            <DateStyle>
              {month}월 {day}일 {week[index]}
            </DateStyle>
            <Temperature>발열체크 하셨나요?</Temperature>
          </DateContainer>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper>
                <ButtonRowWrapper>
                  <Separation>
                    <Megaphone />
                    <StyledButton>공지사항</StyledButton>
                  </Separation>
                  <Icon name="right" size={15} color="#484848" />
                </ButtonRowWrapper>
              </ButtonWrapper>
            </View>
          </View>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper>
                <ButtonRowWrapper>
                  <Separation>
                    <Facility />
                    <StyledButton>시설이용</StyledButton>
                  </Separation>
                  <Icon name="right" size={15} color="#484848" />
                </ButtonRowWrapper>
              </ButtonWrapper>
            </View>
          </View>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper>
                <ButtonRowWrapper>
                  <Separation>
                    <Board />
                    <StyledButton>게시판</StyledButton>
                  </Separation>
                  <Icon name="right" size={15} color="#484848" />
                </ButtonRowWrapper>
              </ButtonWrapper>
            </View>
          </View>
          <View style={styles.topShadow}>
            <View style={styles.bottomShadow}>
              <ButtonWrapper>
                <ButtonRowWrapper>
                  <Separation>
                    <Mypage />
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
  }
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
