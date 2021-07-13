import React, { Component } from 'react';
import {
  Input,
  InputWrapper,
  SubWrapper,
  BottomWrapper,
  ButtonWrapper,
  StyledButton,
  TitleWrapper,
  Title,
  OptionWrapper,
  OptionDescription,
  Option,
} from './RegisterStyle';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      username: '',
      dorm: '',
      room: '',
    };
  }
  render() {
    return (
      <>
        <TitleWrapper>
          <Title>회원가입</Title>
        </TitleWrapper>
        <SubWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              onChnageText={(userId) => this.setState({ userId })}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChnageText={(password) => this.setState({ password })}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="이름"
              onChnageText={(username) => this.setState({ username })}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="소속 동"
              onChnageText={(dorm) => this.setState({ dorm })}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="호실"
              onChnageText={(room) => this.setState({ room })}
            />
          </InputWrapper>
        </SubWrapper>
        <BottomWrapper>
          <ButtonWrapper>
            <StyledButton>Sign up</StyledButton>
          </ButtonWrapper>
          <OptionWrapper>
            <OptionDescription>Already have an account?</OptionDescription>
            <Option>Login</Option>
          </OptionWrapper>
        </BottomWrapper>
      </>
    );
  }
}

export default Register;
