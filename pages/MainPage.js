import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main/Main';

const Stack = createStackNavigator();

const MainPage = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerTitleAlign: 'center',
    //   headerTintColor: theme.text,
    //   headerBackTitleVisible: false,
    //   cardStyle: { backgroundColor: theme.background },
    // }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainPage;
