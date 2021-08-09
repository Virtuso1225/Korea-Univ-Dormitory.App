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
import Close from 'react-native-vector-icons/EvilIcons';
import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { CloseWrapper } from '../mypage/DropOutStyle';
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
                    color: day === '일' ? 'red' : 'black',
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
                height: 50,
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
                    if (isSelected) {
                      setOvernightDate({
                        ...overnightDate,
                        startDate: `${value.format('YYYY')}${-value.format(
                          'MM'
                        )}${-day.format('D')}`,
                      });
                    } else {
                      setOvernightDate({
                        ...overnightDate,
                        endDate: `${value.format('YYYY')}${-value.format(
                          'MM'
                        )}${-day.format('D')}`,
                      });
                    }
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
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 13,
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
