import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main/Main';

const Stack = createStackNavigator();

const MainPage = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainPage;
