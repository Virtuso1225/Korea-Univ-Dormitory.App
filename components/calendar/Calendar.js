import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');
  const month = new Date().getMonth() + 1;
  useEffect(() => {
    const a = [];
    const day = startDay.clone().subtract(1, 'day');
    while (day.isBefore(endDay, 'day')) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    setCalendar(a);
  }, [value]);

  const dayStyle = (day) => {
    if (value.month() + 1 !== month) {
      if (
        day.isBefore(value.clone().startOf('month'), 'day') ||
        day.isAfter(value.clone().endOf('month'), 'day')
      ) {
        return styles.notThisMonth;
      }
      return styles.default;
    }
    if (
      day.isBefore(value.clone().startOf('month'), 'day') ||
      day.isAfter(value.clone().endOf('month'), 'day')
    ) {
      return styles.notThisMonth;
    }
    if (value.isSame(day, 'day')) {
      return styles.today;
    }
    return styles.thisMonth;
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setValue(value.clone().subtract(1, 'month'));
          }}
        >
          <Icon name="left" size={15} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>
            {value.format('YYYY')}.{value.format('M')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setValue(value.clone().add(1, 'month'))}
        >
          <Icon name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.topShadow}>
        <View style={styles.bottomShadow}>
          <View style={styles.tempInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: 'rgba(155, 24, 24, 0.2)',
                  width: 31,
                  height: 23,
                  borderRadius: 8,
                }}
              />
              <Text
                style={{ fontFamily: 'Medium', color: '#707070', fontSize: 11 }}
              >
                {' '}
                : 외박 기록
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#850000',
                  width: 11,
                  height: 11,
                  borderRadius: 5.5,
                }}
              />
              <Text
                style={{ fontFamily: 'Medium', color: '#707070', fontSize: 11 }}
              >
                {' '}
                : 체온 기록 완료
              </Text>
            </View>
          </View>
        </View>
      </View>
      {calendar.map((week) => (
        <View
          key={week}
          style={{
            height: 100,
            flexDirection: 'row',
            borderBottomWidth: 0.4,
            borderBottomColor: '#CBCCCE',
          }}
        >
          {week.map((day) => (
            <View
              key={day}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 5,
              }}
            >
              <View
                style={
                  dayStyle(day) === styles.today
                    ? styles.todayWrapper
                    : styles.defaultWrapper
                }
              >
                <Text style={dayStyle(day)}>{day.format('D')}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  notThisMonth: {
    color: 'gray',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  thisMonth: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  today: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  todayWrapper: {
    backgroundColor: '#D8D8DA',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  defaultWrapper: {
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  headerText: {
    fontFamily: 'Heavy',
    fontSize: responsiveScreenFontSize(2.36),
  },
  tempInfo: {
    width: responsiveScreenWidth(89.48),
    height: responsiveScreenHeight(4.97),
    backgroundColor: '#F9F7F4',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
export default Calendar;