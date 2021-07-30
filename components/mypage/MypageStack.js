import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from './Mypage';
import DropOut from './DropOut';

const Stack = createStackNavigator();

const MypageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dropout"
        component={DropOut}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MypageStack;
