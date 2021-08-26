import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import { Board } from '../../assets/Svgs';

import {
  CenterView,
  ModalWrapper,
  Button,
} from '../mypage/ModalComponentStyle';
import CustomText from '../theme/CustomTextStyle';
import {
  ButtonWrapper,
  StyledButton,
  ButtonRowWrapper,
  Separation,
} from './MainStyle';

const PreparingBoardModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <CenterView>
            <ModalWrapper>
              <CustomText
                size={responsiveScreenFontSize(1.72)}
                font="Medium"
                color="#1D1D1D"
              >
                준비 중인 서비스입니다.
              </CustomText>
              <CustomText
                size={responsiveScreenFontSize(2)}
                font="Medium"
                color="#404040"
              />
              <Button
                color="#850000"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <CustomText
                  size={responsiveScreenFontSize(1.5)}
                  font="Medium"
                  color="#FEFCF9"
                >
                  닫기
                </CustomText>
              </Button>
            </ModalWrapper>
          </CenterView>
        </Modal>
      </View>
      <ButtonWrapper onPress={() => setModalVisible(true)}>
        <ButtonRowWrapper>
          <Separation>
            <Board />
            <StyledButton>게시판</StyledButton>
          </Separation>
          <Icon name="right" size={15} color="#484848" />
        </ButtonRowWrapper>
      </ButtonWrapper>
    </>
  );
};

export default PreparingBoardModal;
