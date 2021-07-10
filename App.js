import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Front from './components/front/Front';
import Register from './components/register/Register';

const App = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
