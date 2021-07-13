import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {
  HeadTitle,
  SubTitle,
  TitleWrapper,
  Logo,
  Input,
  ButtonWrapper,
  StyledButton,
  BottomWrapper,
  CheckWrapper,
  Check,
  Description,
  TextArea,
  TextWrapper,
  EngSub,
  Separate,
  Titles,
} from './FrontStyle';

const Front = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <TitleWrapper>
          <HeadTitle>안암학사</HeadTitle>
          <Separate>
            <Logo source={require('../../assets/crimson2positive.png')} />
            <Titles>
              <SubTitle>고려대학교</SubTitle>
              <EngSub>KOREA UNIVERSITY</EngSub>
            </Titles>
          </Separate>
        </TitleWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1.6 }}
        >
          <TextArea>
            <TextWrapper>
              <Input placeholder="Email" />
            </TextWrapper>
            <TextWrapper>
              <Input placeholder="password" secureTextEntry={true} />
            </TextWrapper>
            <CheckWrapper>
              <TouchableOpacity
                onPress={() => {
                  isSelected ? setSelection(false) : setSelection(true);
                }}
              >
                <Check>
                  {isSelected && (
                    <Icon name="check" size={25} color="#707070" />
                  )}
                </Check>
              </TouchableOpacity>
              <Description>Keep me logged in</Description>
            </CheckWrapper>
          </TextArea>
        </KeyboardAvoidingView>
        <BottomWrapper>
          <ButtonWrapper>
            <StyledButton onPress={() => navigation.navigate('Login')}>
              Login
            </StyledButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledButton onPress={() => navigation.navigate('Register')}>
              Register
            </StyledButton>
          </ButtonWrapper>
        </BottomWrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

// const styles = StyleSheet.create({
//   TextWrapper: {
//     borderWidth: 1,
//     borderRadius: 10,
//     minWidth: 301,
//     height: 54,
//     justifyContent: 'space-around',
//     alignSelf: 'center',
//     paddingTop: 3,
//     paddingLeft: 10,
//     paddingBottom: 3,
//     paddingRight: 10,
//     marginTop: 29,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 1,
//     // },
//     shadowOpacity: 1,
//     shadowRadius: 2.22,
//     // elevation: 3,
//     backgroundColor: 'white',
//   },
//   ButtonWrapper: {
//     alignItems: 'center',
//     borderRadius: 10,
//     width: 140,
//     height: 39,
//     marginRight: 10,
//     marginLeft: 10,
//     justifyContent: 'center',
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: -9,
//     //   height: 10,
//     // },
//     shadowOpacity: 1,
//     // shadowRadius: 27,
//     // elevation: 3,
//   },
// });
{
  /* <LinearGradient
          colors={['#E8EBF2', '#F2F3F7']}
          // colors={['red', 'yellow', 'green']}
          style={styles.TextWrapper}
          start={{ x: 0.7, y: 0 }}
          end={{ x: 1, y: 0 }}
        > */
}
{
  /* </LinearGradient> */
}
export default Front;
