import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { UserContext } from '../contexts';

const ModalCalendar = ({ isSelected }) => {
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

  const dayStyle = (day, period) => {
    if (
      isSelected &&
      day.format('DD') === period.startDate.split('-')[2] &&
      !day.isAfter(value.clone().endOf('month'), 'day') &&
      value.format('MM') === period.startDate.split('-')[1]
    ) {
      return styles.period;
    }
    if (
      !isSelected &&
      day.format('DD') === period.endDate.split('-')[2] &&
      !day.isAfter(value.clone().endOf('month'), 'day') &&
      value.format('MM') === period.endDate.split('-')[1]
    ) {
      return styles.period;
    }
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

  const dayWrapper = (day, period) => {
    if (
      isSelected &&
      day.format('DD') === period.startDate.split('-')[2] &&
      !day.isAfter(value.clone().endOf('month'), 'day') &&
      value.format('MM') === period.startDate.split('-')[1]
    ) {
      return styles.periodWrapper;
    }
    if (
      !isSelected &&
      day.format('DD') === period.endDate.split('-')[2] &&
      !day.isAfter(value.clone().endOf('month'), 'day') &&
      value.format('MM') === period.endDate.split('-')[1]
    ) {
      return styles.periodWrapper;
    }
    if (value.isSame(day, 'day') && value.month() + 1 === month) {
      return styles.todayWrapper;
    }
    return styles.defaultWrapper;
  };

  const isThisMonth = (day) => {
    if (
      day.isBefore(value.clone().startOf('month'), 'day') ||
      day.isAfter(value.clone().endOf('month'), 'day')
    ) {
      return false;
    }
    return true;
  };
  return (
    <UserContext.Consumer>
      {({ setOvernightDate, overnightDate }) => (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={styles.headerText}>{value.format('M')}월</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setValue(value.clone().subtract(1, 'month'));
              }}
            >
              <Icon name="left" size={20} color="#9B1818" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setValue(value.clone().add(1, 'month'))}
            >
              <Icon name="right" size={20} color="#9B1818" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <View
                key={day}
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Medium',
                    fontSize: 12,
                    color: day === '일' ? 'red' : '#A0A0A0',
                  }}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
          {calendar.map((week) => (
            <View
              key={week}
              style={{
                width: '90%',
                height: responsiveScreenHeight(5.92),
                flexDirection: 'row',
              }}
            >
              {week.map((day) => (
                <Pressable
                  key={day}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 5,
                  }}
                  onPress={() => {
                    if (isSelected && isThisMonth(day)) {
                      setOvernightDate({
                        ...overnightDate,
                        startDate: `${value.format('YYYY')}-${value.format(
                          'MM'
                        )}-${day.format('DD')}`,
                      });
                    } else if (!isSelected && isThisMonth(day)) {
                      setOvernightDate({
                        ...overnightDate,
                        endDate: `${value.format('YYYY')}-${value.format(
                          'MM'
                        )}-${day.format('DD')}`,
                      });
                    }
                  }}
                >
                  <View style={dayWrapper(day, overnightDate)}>
                    <Text style={dayStyle(day, overnightDate)}>
                      {day.format('D')}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      )}
    </UserContext.Consumer>
  );
};
const styles = StyleSheet.create({
  notThisMonth: {
    color: 'gray',
    fontFamily: 'Medium',
    fontSize: 13,
  },
  thisMonth: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 13,
  },
  today: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 13,
  },
  todayWrapper: {
    backgroundColor: '#D8D8DA',
    borderRadius: 12.5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  period: {
    color: '#9B1818',
    fontFamily: 'Medium',
    fontSize: 13,
  },
  periodWrapper: {
    backgroundColor: 'rgba(133, 0, 0, 0.17)',
    borderRadius: 12.5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 13,
  },
  defaultWrapper: {
    borderRadius: 12.5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Bold6',
    fontSize: responsiveScreenFontSize(2.36),
    color: '#404040',
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
export default ModalCalendar;
