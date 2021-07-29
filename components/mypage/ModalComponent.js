import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { LogoutIcon } from '../../assets/Svgs';
import {
  CenterView,
  RowWrapper,
  ButtonText,
  ModalWrapper,
  CustomText,
  Button,
} from './ModalComponentStyle';

const ModalComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const SignOut = props;
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
                로그아웃
              </CustomText>
              <CustomText
                size={responsiveScreenFontSize(1.29)}
                font="Medium"
                color="#404040"
              >
                정말 로그아웃 하시겠습니까?
              </CustomText>
              <Button color="#850000" onPress={SignOut.handlePress}>
                <CustomText
                  size={responsiveScreenFontSize(1.5)}
                  font="Medium"
                  color="#FEFCF9"
                >
                  로그아웃
                </CustomText>
              </Button>
              <Button
                color="#FFFDF9"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <CustomText
                  size={responsiveScreenFontSize(1.5)}
                  font="Medium"
                  color="#850000"
                >
                  닫기
                </CustomText>
              </Button>
            </ModalWrapper>
          </CenterView>
        </Modal>
      </View>
      <RowWrapper onPress={() => setModalVisible(true)}>
        <LogoutIcon />
        <ButtonText>로그아웃</ButtonText>
      </RowWrapper>
    </>
  );
};

export default ModalComponent;
