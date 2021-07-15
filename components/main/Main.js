// 로그인 기능 구현 test용
import React, {useContext} from 'react';
import {UserContext} from '../contexts'
import styled from 'styled-components/native';

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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: wheat;
`;

const Main = ({ navigation, route}) => {
  const {setUser} = useContext(UserContext);
  return (
    <Container>
      <StyledButton onPress={() => setUser({})}>
        Sign out
      </StyledButton>
    </Container>
  );
};    
  export default Main;
    