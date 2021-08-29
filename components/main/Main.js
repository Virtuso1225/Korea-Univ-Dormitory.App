import React, { useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
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
} from './MainStyle';
import { Megaphone, MypageIcon } from '../../assets/Svgs';
import PreparingFacilityUseModal from './PreparingFacilityUseModal';
import PreparingBoardModal from './PreparingBoardModal';
import ShadowGenerator from '../theme/ShadowGenerator';
import DateHeadr from './DateHeader';
import { UserContext } from '../contexts';
import { fs, getNotice } from '../firebase';

const Main = ({ navigation }) => {
  const { setNotice } = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = fs.collection('notice').onSnapshot(
      async () => {
        const noticeList = await getNotice();
        setNotice(noticeList);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
    return () => unsubscribe();
  }, []);

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
        <DateHeadr />
        <ShadowGenerator>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('Footer', { screen: '공지사항' })
            }
          >
            <ButtonRowWrapper>
              <Separation>
                <Megaphone
                  widthProp={23.04}
                  heightProp={22.8}
                  colorProp="#9B1818"
                />
                <StyledButton>공지사항</StyledButton>
              </Separation>
              <Icon name="right" size={15} color="#484848" />
            </ButtonRowWrapper>
          </ButtonWrapper>
        </ShadowGenerator>
        <ShadowGenerator>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('Footer', { screen: '마이페이지' })
            }
          >
            <ButtonRowWrapper>
              <Separation>
                <MypageIcon
                  widthProp={20.21}
                  heightProp={22.48}
                  colorProp="#9B1818"
                  fillProp="none"
                />
                <StyledButton>마이페이지</StyledButton>
              </Separation>
              <Icon name="right" size={15} color="#484848" />
            </ButtonRowWrapper>
          </ButtonWrapper>
        </ShadowGenerator>
        <ShadowGenerator>
          <PreparingBoardModal />
        </ShadowGenerator>
        <ShadowGenerator>
          <PreparingFacilityUseModal />
        </ShadowGenerator>
      </ButtonsContainer>
    </Container>
  );
};

export default Main;
