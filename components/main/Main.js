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
import { fs, getNotice, getMyPenalty, getMyPenaltySum } from '../firebase';

const Main = ({ navigation }) => {
  const { setNotice, setMyPenalty, user, setProfileInfo, profileInfo } =
    useContext(UserContext);
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

  useEffect(() => {
    const collectionPenaltyPath = `users/${user.uid}/penaltyInfo`;
    const unsubscribe = fs.collection(collectionPenaltyPath).onSnapshot(
      async () => {
        const setInfo = async () => {
          const penaltyList = await getMyPenalty();
          return penaltyList;
        };
        const myPenalty = await setInfo().then((result) => {
          setMyPenalty(result);
          return result;
        });

        const myPenaltySum = getMyPenaltySum(myPenalty);

        setProfileInfo({
          ...profileInfo,
          myPenaltySum,
        });
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
          <HeadTitle font="Light">???????????????</HeadTitle>
          <HeadTitle font="ExtraBold">????????????</HeadTitle>
        </RowWrapper>
        <RowWrapper>
          <SubTitle1 font="ExtraBold">????????????</SubTitle1>
          <SubTitle1 font="Light">??? ?????? ?????? ???????????????.</SubTitle1>
        </RowWrapper>
      </TitleWrapper>
      <ButtonsContainer>
        <DateHeadr />
        <ShadowGenerator>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('Footer', { screen: '????????????' })
            }
          >
            <ButtonRowWrapper>
              <Separation>
                <Megaphone
                  widthProp={23.04}
                  heightProp={22.8}
                  colorProp="#9B1818"
                />
                <StyledButton>????????????</StyledButton>
              </Separation>
              <Icon name="right" size={15} color="#484848" />
            </ButtonRowWrapper>
          </ButtonWrapper>
        </ShadowGenerator>
        <ShadowGenerator>
          <ButtonWrapper
            onPress={() =>
              navigation.navigate('Footer', { screen: '???????????????' })
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
                <StyledButton>???????????????</StyledButton>
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
