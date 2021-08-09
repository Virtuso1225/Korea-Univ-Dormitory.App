import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
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
import { UserContext } from '../contexts';

const ModalCalendarContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateSelection, setDateSelection] = useState(true);
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
                    onPress={() => {
                      setModalVisible(false);
                      setOvernightDate({ startDate: '', endDate: '' });
                      setDateSelection(true);
                    }}
                  >
                    <CustomText font="Medium" color="#9B1818" size="15">
                      취소
                    </CustomText>
                  </ButtonWrapper>
                  <ButtonWrapper
                    onPress={() => {
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
