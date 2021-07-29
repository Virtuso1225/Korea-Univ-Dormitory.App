import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
import DropOut from '../components/mypage/DropOut';

const Stack = createStackNavigator();

const MainPage = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Footer"
      component={Footer}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainPage;
