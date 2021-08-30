import styled from 'styled-components/native';

export const NavigationWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const TextWrapper = styled.Text`
  color: ${(props) => (props.activated ? 'black' : '#404040')};
  font-size: 9px;
  font-family: Medium;
  margin-top: 5px;
`;
