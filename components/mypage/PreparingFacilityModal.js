import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { FacilityIcon } from '../../assets/Svgs';
import {
  CenterView,
  RowWrapper,
  ButtonText,
  ModalWrapper,
  CustomText,
  Button,
} from './ModalComponentStyle';

const PreparingFacilityModal = () => {
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
      <RowWrapper onPress={() => setModalVisible(true)}>
        <FacilityIcon />
        <ButtonText>최근 예약 내역</ButtonText>
      </RowWrapper>
    </>
  );
};

export default PreparingFacilityModal;
