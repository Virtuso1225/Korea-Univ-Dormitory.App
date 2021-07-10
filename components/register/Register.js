import React, { Component } from 'react';
import {
  Input,
  InputContent,
  InputWrapper,
  SubWrapper,
  Wrapper,
  ButtonWrapper,
  StyledButton,
} from './RegisterStyle';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      username: '',
      dorm: '',
    };
  }
  render() {
    return (
      <Wrapper>
        <SubWrapper>
          <InputWrapper>
            <InputContent>user ID(학번)</InputContent>
            <Input onChnageText={(userId) => this.setState({ userId })} />
          </InputWrapper>
          <InputWrapper>
            <InputContent>password</InputContent>
            <Input
              secureTextEntry={true}
              onChnageText={(password) => this.setState({ password })}
            />
          </InputWrapper>
          <InputWrapper>
            <InputContent>이름</InputContent>
            <Input onChnageText={(username) => this.setState({ username })} />
          </InputWrapper>
          <InputWrapper>
            <InputContent>호실</InputContent>
            <Input onChnageText={(dorm) => this.setState({ dorm })} />
          </InputWrapper>
        </SubWrapper>
        <ButtonWrapper>
          <StyledButton>Sign up</StyledButton>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default Register;
