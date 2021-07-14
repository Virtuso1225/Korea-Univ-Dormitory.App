import React from 'react';
import { ActivityIndicator} from "react-native";
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: wheat;
`;


const Indicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
  color: '#fffff',
}))``;

const Spinner = () => {
  return (
    <Container>
      <Indicator />
    </Container>
  );
};

export default Spinner;
