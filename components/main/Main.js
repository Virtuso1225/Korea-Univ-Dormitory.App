// 로그인 기능 구현 test용
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  InputWrapper,
  Input,
  StyledButton,
  BottomWrapper,
  CheckWrapper,
  Check,
  Description,
  TextArea,
} from './MainStyle';

const Main = ({ navigation, route}) => {
  return (
    <StyledButton onPress={() => navigation.navigate('Login')}>
      Sign out
    </StyledButton>
  );
};    
  export default Main;
    