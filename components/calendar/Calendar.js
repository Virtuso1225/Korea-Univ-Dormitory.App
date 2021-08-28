import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import ShadowGenerator from '../theme/ShadowGenerator';

const Calendar = ({ navigation }) => {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  const { overnightDate } = useContext(UserContext);
  const startDate = moment(overnightDate.startDate);
  const endDate = moment(overnightDate.endDate);
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
  const dayWrapper = (day) => {
    if (day.format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD')) {
      return styles.periodStart;
    }
    if (day.format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {
      return styles.periodEnd;
    }
    if (day.isBefore(endDate, 'day') && day.isAfter(startDate, 'day')) {
      return styles.periodBetween;
    }
    return styles.defaultWrapper;
  };
  return (
    <UserContext.Consumer>
      {({ temperature }) => (
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
              <Icon name="left" size={16} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>
                {value.format('YYYY')}.{value.format('M')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setValue(value.clone().add(1, 'month'))}
            >
              <Icon name="right" size={16} color="black" />
            </TouchableOpacity>
            <CloseWrapper onPress={() => navigation.goBack()}>
              <Close name="close" size={23} color="#707070" />
            </CloseWrapper>
          </View>
          <ShadowGenerator>
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
                  style={{
                    fontFamily: 'Medium',
                    color: '#707070',
                    fontSize: 11,
                  }}
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
                  style={{
                    fontFamily: 'Medium',
                    color: '#707070',
                    fontSize: 11,
                  }}
                >
                  {' '}
                  : 체온 기록 완료
                </Text>
              </View>
            </View>
          </ShadowGenerator>
          <View style={{ flexDirection: 'row' }}>
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
                    fontSize: 11,
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
                height: responsiveScreenHeight(11.84),
                flexShrink: 1,
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
                  }}
                >
                  <View style={dayWrapper(day)}>
                    <View
                      style={
                        value.isSame(day, 'day') && value.month() + 1 === month
                          ? styles.todayWrapper
                          : ''
                      }
                    >
                      <Text style={dayStyle(day)}>{day.format('D')}</Text>
                    </View>
                    <View
                      style={
                        temperature[day.format('YYYY-MM-DD')] !== undefined
                          ? styles.dot
                          : ''
                      }
                    />
                  </View>
                </View>
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
  period: {
    color: '#9B1818',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  periodStart: {
    backgroundColor: 'rgba(133, 0, 0, 0.17)',
    borderTopLeftRadius: 12.5,
    borderBottomLeftRadius: 12.5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 5,
  },
  periodBetween: {
    backgroundColor: 'rgba(133, 0, 0, 0.17)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 5,
  },
  periodEnd: {
    backgroundColor: 'rgba(133, 0, 0, 0.17)',
    borderTopRightRadius: 12.5,
    borderBottomRightRadius: 12.5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 5,
  },
  default: {
    color: 'black',
    fontFamily: 'Medium',
    fontSize: 11,
  },
  defaultWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 5,
  },
  headerText: {
    fontFamily: 'Heavy',
    fontSize: responsiveScreenFontSize(2.36),
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#850000',
    marginTop: 4,
  },
  tempInfo: {
    width: responsiveScreenWidth(89.48),
    height: responsiveScreenHeight(4.97),
    backgroundColor: '#F9F7F4',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 12,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
export default Calendar;
