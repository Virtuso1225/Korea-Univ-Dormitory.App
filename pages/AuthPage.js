import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Front from '../components/front/Front';
import Register from '../components/register/Register';
import FindPassword from '../components/findPassword/FindPassword';

const Stack = createStackNavigator();

const AuthPage = () => (
  <Stack.Navigator initialRouteName="Front">
    <Stack.Screen
      name="Login"
      component={Front}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FindPassword"
      component={FindPassword}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthPage;
