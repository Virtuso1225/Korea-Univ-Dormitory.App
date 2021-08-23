import React from 'react';
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

const Main = ({ navigation }) => {
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
                  widthProp={27.365}
                  heightProp={27.103}
                  colorProp="#9B1818"
                />
                <StyledButton>공지사항</StyledButton>
              </Separation>
              <Icon name="right" size={15} color="#484848" />
            </ButtonRowWrapper>
          </ButtonWrapper>
        </ShadowGenerator>
        <ShadowGenerator>
          <PreparingFacilityUseModal />
        </ShadowGenerator>
        <ShadowGenerator>
          <PreparingBoardModal />
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
        </ShadowGenerator>
      </ButtonsContainer>
    </Container>
  );
};

export default Main;
