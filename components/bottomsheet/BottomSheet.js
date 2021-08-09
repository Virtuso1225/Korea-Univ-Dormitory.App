import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {
  BlurBackground,
  BottomModalWrapper,
  ModalActiveBar,
  ModalHeader,
  OptionContainer,
  OvernightButton,
  RowWrapper,
  SubmitButton,
  TemperatureInput,
  CustomTextMargin,
} from './BottomSheetStyle';
import { OvernightIcon, TemperatureIcon } from '../../assets/Svgs';
import ModalCalendarContainer from './ModalCalendarContainer';

const BottomSheet = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const value = moment();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1.6 }}
          >
            <BlurBackground>
              <BottomModalWrapper>
                <ModalHeader>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Icons name="chevron-thin-down" size={20} color="#ADADAD" />
                  </TouchableOpacity>
                </ModalHeader>
                <OptionContainer>
                  <RowWrapper>
                    <TemperatureIcon />
                    <CustomTextMargin font="Bold6" size="14" color="#404040">
                      체온 기록
                    </CustomTextMargin>
                    <TemperatureInput keyboardType="number-pad" />
                    <CustomTextMargin font="Bold6" size="14" color="#404040">
                      °C
                    </CustomTextMargin>
                    <View style={styles.topShadow}>
                      <View style={styles.bottomShadow}>
                        <SubmitButton>
                          <CustomTextMargin
                            font="Medium"
                            size="14"
                            color="#404040"
                          >
                            완료
                          </CustomTextMargin>
                        </SubmitButton>
                      </View>
                    </View>
                  </RowWrapper>
                </OptionContainer>
                <OptionContainer>
                  <ModalCalendarContainer />
                </OptionContainer>
              </BottomModalWrapper>
            </BlurBackground>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      <ModalActiveBar onPress={() => setModalVisible(true)}>
        <Icons name="chevron-thin-up" size={20} color="#ADADAD" />
      </ModalActiveBar>
    </View>
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
    shadowColor: '#DED7CA',
  },
});
export default BottomSheet;
