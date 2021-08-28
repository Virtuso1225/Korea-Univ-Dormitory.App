import React from 'react';
import { ButtonWrapper, StyledButton } from '../front/FrontStyle';
import ShadowGenerator from '../theme/ShadowGenerator';

const LoginRegisterButton = ({ text, handler }) => {
  return (
    <ShadowGenerator>
      <ButtonWrapper onPress={handler}>
        <StyledButton>{text}</StyledButton>
      </ButtonWrapper>
    </ShadowGenerator>
  );
};

export default LoginRegisterButton;
