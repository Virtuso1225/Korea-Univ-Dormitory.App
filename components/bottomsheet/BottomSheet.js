import React, { useState, useContext } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { UserContext, ProgressContext } from '../contexts';
import {
  BlurBackground,
  BottomModalWrapper,
  ModalActiveBar,
  ModalHeader,
  OptionContainer,
  RowWrapper,
  SubmitButton,
  TemperatureInput,
  CustomTextMargin,
} from './BottomSheetStyle';
import { setMyTemperature } from '../firebase';
import { TemperatureIcon } from '../../assets/Svgs';
import ModalCalendarContainer from './ModalCalendarContainer';
import ShadowGenerator from '../theme/ShadowGenerator';

const BottomSheet = () => {
  const { spinner } = useContext(ProgressContext);
  const { setTemperature, temperature } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const today = moment().format('YYYY-MM-DD');
  const _handleSetTempBtnPress = async () => {
    if (value !== '') {
      try {
        spinner.start();
        await setMyTemperature(value);
        setTemperature({ ...temperature, [today]: value });
      } catch (e) {
        Alert.alert('체온기록 에러', e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  return (
    <UserContext.Consumer>
      {({ temperature }) => (
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
                        <Icons
                          name="chevron-thin-down"
                          size={20}
                          color="#ADADAD"
                        />
                      </TouchableOpacity>
                    </ModalHeader>
                    <OptionContainer>
                      <RowWrapper>
                        <TemperatureIcon />
                        <CustomTextMargin
                          font="Bold6"
                          size="14"
                          color="#404040"
                        >
                          체온 기록
                        </CustomTextMargin>
                        <TemperatureInput
                          keyboardType="decimal-pad"
                          defaultValue={
                            temperature[today]
                              ? temperature[today].toString()
                              : ''
                          }
                          onChangeText={setValue}
                          onSubmitEditing={_handleSetTempBtnPress}
                        />
                        <CustomTextMargin
                          font="Bold6"
                          size="14"
                          color="#404040"
                        >
                          °C
                        </CustomTextMargin>
                        <ShadowGenerator>
                          <SubmitButton onPress={_handleSetTempBtnPress}>
                            <CustomTextMargin
                              font="Medium"
                              size="14"
                              color="#404040"
                            >
                              완료
                            </CustomTextMargin>
                          </SubmitButton>
                        </ShadowGenerator>
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
      )}
    </UserContext.Consumer>
  );
};

export default BottomSheet;
