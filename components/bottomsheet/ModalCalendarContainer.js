import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View, Alert } from 'react-native';
import { UserContext, ProgressContext } from '../contexts';
import {
  BlurBackground,
  CustomTextMargin,
  OvernightButton,
} from './BottomSheetStyle';
import {
  CalendarModalWrapper,
  OptionHeader,
  OptionButton,
  SubmitWrapper,
  ButtonWrapper,
  RowWrapper,
  ColumnWrapper,
} from './ModalCalendarContainerStyle';
import { CustomText } from '../mypage/ModalComponentStyle';
import { OvernightIcon } from '../../assets/Svgs';
import ModalCalendar from './ModalCalendar';
import { setMyStayOut, getMyStayOut } from '../firebase';

const ModalCalendarContainer = () => {
  const { spinner } = useContext(ProgressContext);
  const { overnightDate, setOvernightDate } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [dateSelection, setDateSelection] = useState(true);

  const _handleSetStayOutBtnPress = async () => {
    try {
      spinner.start();

      const err = await setMyStayOut(
        overnightDate.startDate,
        overnightDate.endDate
      );

      const stayOutDB = await getMyStayOut();

      if (err === 1) {
        Alert.alert(
          'SetStayOut Error',
          '외박 등록 시작일은 오늘부터 가능합니다.'
        );
      } else if (err === 2) {
        Alert.alert(
          'SetStayOut Error',
          '이미 진행 중인 외박 일정은 종료일만 변경 가능합니다.'
        );
      } else if (err === 3) {
        Alert.alert(
          'SetStayOut Error',
          '종료일은 시작일 이전이 될 수 없습니다.'
        );
      }
      setOvernightDate(stayOutDB);
    } catch (e) {
      Alert.alert('SetStayOut Error', e.message);
    } finally {
      spinner.stop();
    }
  };
  return (
    <UserContext.Consumer>
      {({ setOvernightDate, overnightDate }) => (
        <View>
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <BlurBackground>
              <CalendarModalWrapper>
                <OptionHeader>
                  <View style={styles.topShadow}>
                    <View style={styles.bottomShadow}>
                      <OptionButton
                        onPress={() => setDateSelection(!dateSelection)}
                      >
                        <CustomText
                          font="Regular"
                          size="12"
                          color={dateSelection ? '#9B1818' : '#CFCFCF'}
                        >
                          시작
                        </CustomText>
                        <RowWrapper>
                          <CustomText
                            font="Bold6"
                            size="20"
                            color={dateSelection ? '#9B1818' : '#CFCFCF'}
                          >
                            {overnightDate.startDate.split('-')[2]}
                          </CustomText>
                          <ColumnWrapper>
                            <RowWrapper>
                              <CustomText
                                font="Regular"
                                size="12"
                                color={dateSelection ? '#9B1818' : '#CFCFCF'}
                              >
                                {overnightDate.startDate.split('-')[0]}년{' '}
                              </CustomText>
                              <CustomText
                                font="Regular"
                                size="12"
                                color={dateSelection ? '#9B1818' : '#CFCFCF'}
                              >
                                {overnightDate.startDate.split('-')[1]}월
                              </CustomText>
                            </RowWrapper>
                          </ColumnWrapper>
                        </RowWrapper>
                      </OptionButton>
                    </View>
                  </View>
                  <View style={styles.topShadow}>
                    <View style={styles.bottomShadow}>
                      <OptionButton
                        onPress={() => setDateSelection(!dateSelection)}
                      >
                        <CustomText
                          font="Regular"
                          size="12"
                          color={!dateSelection ? '#9B1818' : '#CFCFCF'}
                        >
                          종료
                        </CustomText>
                        <RowWrapper>
                          <CustomText
                            font="Bold6"
                            size="20"
                            color={!dateSelection ? '#9B1818' : '#CFCFCF'}
                          >
                            {overnightDate.endDate.split('-')[2]}
                          </CustomText>
                          <ColumnWrapper>
                            <RowWrapper>
                              <CustomText
                                font="Regular"
                                size="12"
                                color={!dateSelection ? '#9B1818' : '#CFCFCF'}
                              >
                                {overnightDate.endDate.split('-')[0]}년{' '}
                              </CustomText>
                              <CustomText
                                font="Regular"
                                size="12"
                                color={!dateSelection ? '#9B1818' : '#CFCFCF'}
                              >
                                {overnightDate.endDate.split('-')[1]}월
                              </CustomText>
                            </RowWrapper>
                          </ColumnWrapper>
                        </RowWrapper>
                      </OptionButton>
                    </View>
                  </View>
                </OptionHeader>
                <ModalCalendar isSelected={dateSelection} />
                <SubmitWrapper>
                  <ButtonWrapper
                    onPress={async () => {
                      const myStayOut = await getMyStayOut();
                      setModalVisible(false);
                      setOvernightDate(myStayOut);
                      setDateSelection(true);
                    }}
                  >
                    <CustomText font="Medium" color="#9B1818" size="15">
                      취소
                    </CustomText>
                  </ButtonWrapper>
                  <ButtonWrapper
                    onPress={() => {
                      _handleSetStayOutBtnPress(
                        overnightDate.startDate,
                        overnightDate.endDate
                      );
                      setModalVisible(false);
                      setDateSelection(true);
                    }}
                  >
                    <CustomText font="Medium" color="#9B1818" size="15">
                      확인
                    </CustomText>
                  </ButtonWrapper>
                </SubmitWrapper>
              </CalendarModalWrapper>
            </BlurBackground>
          </Modal>
          <OvernightButton onPress={() => setModalVisible(true)}>
            <OvernightIcon />
            <CustomTextMargin font="Bold6" size="14" color="#404040">
              외박 기록
            </CustomTextMargin>
            <CustomTextMargin font="Medium" size="13" color="#404040">
              {overnightDate.startDate.split('-')[1]}월{' '}
              {overnightDate.startDate.split('-')[2]}일 -{' '}
              {overnightDate.endDate.split('-')[1]}월{' '}
              {overnightDate.endDate.split('-')[2]}일
            </CustomTextMargin>
          </OvernightButton>
        </View>
      )}
    </UserContext.Consumer>
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
export default ModalCalendarContainer;
