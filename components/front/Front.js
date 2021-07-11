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
} from './FrontStyle';

const Front = ({ navigation }) => {
  return (
    <>
      <TitleWrapper>
        <HeadTitle>안암학사</HeadTitle>
        <SubTitle>고려대학교</SubTitle>
      </TitleWrapper>
      <TextArea>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          // colors={['red', 'yellow', 'green']}
          style={styles.TextWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <InputWrapper>
            <Input placeholder="user ID (학번)" />
          </InputWrapper>
        </LinearGradient>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.TextWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <InputWrapper>
            <Input placeholder="password" />
          </InputWrapper>
        </LinearGradient>
        <CheckWrapper>
          <Check>
            <Icon name="check" size={25} color="#707070" />
          </Check>
          <Description>Keep me logged in</Description>
        </CheckWrapper>
      </TextArea>
      <BottomWrapper>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.ButtonWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <StyledButton onPress={() => navigation.navigate('Login')}>
            Login
          </StyledButton>
        </LinearGradient>
        <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          style={styles.ButtonWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <StyledButton onPress={() => navigation.navigate('Register')}>
            Register
          </StyledButton>
        </LinearGradient>
      </BottomWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  TextWrapper: {
    borderRadius: 10,
    minWidth: 301,
    height: 54,
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingTop: 3,
    paddingLeft: 10,
    paddingBottom: 3,
    paddingRight: 10,
    marginTop: 29,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ButtonWrapper: {
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
    width: 140,
    height: 39,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
});

export default Front;
