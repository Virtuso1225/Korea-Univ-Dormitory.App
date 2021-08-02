import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from './Mypage';
import DropOut from './DropOut';
import Temperature from './Temperature';
import PersonalInfo from './PersonalInfo';
import DormInfo from './DormInfo';
import NicknameInfo from './NicknameInfo';
import PasswordInfo from './PasswordInfo';

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
        name="Calendar"
        component={Temperature}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DormInfo"
        component={DormInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NicknameInfo"
        component={NicknameInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordInfo"
        component={PasswordInfo}
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
