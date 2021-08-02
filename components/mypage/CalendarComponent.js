import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { NormalTempIcon } from '../../assets/Svgs';

LocaleConfig.locales.fr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'fr';

const CalendarComponent = () => {
  return (
    <Calendar
      // Specify style for calendar container element. Default = {}
      monthFormat="yyyy. M"
      style={[styles.calendar, styles.customCalendar]}
      dayComponent={({ date, state, marking }) => {
        return (
          <View
            style={{
              height: 80,
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                styles.customDay,
                state === 'today' ? styles.todayText : styles.defaultText,
                state !== 'today' && state === 'disabled'
                  ? styles.disabledText
                  : styles.defaultText,
              ]}
            >
              {date.day}
            </Text>
            <NormalTempIcon />
          </View>
        );
      }}
      markingType="custom"
      markedDates={{
        '2021-08-21': {
          customStyles: {
            container: {
              backgroundColor: 'black',
              elevation: 2,
            },
            text: {
              color: 'red',
            },
          },
        },
      }}
      // Specify theme properties to override specific styles for calendar parts. Default = {}
      theme={{
        calendarBackground: '#F9F7F4',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#404040',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: '#404040',
        indicatorColor: 'blue',
        textDayFontFamily: 'Medium',
        textMonthFontFamily: 'Heavy',
        textDayHeaderFontFamily: 'Medium',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 11,
        textMonthFontSize: 22,
        textDayHeaderFontSize: 11,
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: 'red',
          },
          dayTextAtIndex1: {
            color: '#404040',
          },
          dayTextAtIndex2: {
            color: '#404040',
          },
          dayTextAtIndex3: {
            color: '#404040',
          },
          dayTextAtIndex4: {
            color: '#404040',
          },
          dayTextAtIndex5: {
            color: '#404040',
          },
          dayTextAtIndex6: {
            color: '#404040',
          },
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {},
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: '#404040',
  },
  todayText: {
    color: '#850000',
    // backgroundColor: '#850000',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  customCalendar: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
    fontFamily: 'Medium',
    fontSize: 11,
    marginBottom: 8.4,
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
});
export default CalendarComponent;
