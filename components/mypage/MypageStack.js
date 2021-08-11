import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from './Mypage';
import DropOut from './DropOut';
import Temperature from './Temperature';
import PersonalInfo from './PersonalInfo';
import DormInfo from './DormInfo';
import NicknameInfo from './NicknameInfo';
import PasswordInfo from './PasswordInfo';
import MyPenalty from './MyPenalty';
import ProfileImageInfo from './ProfileImageInfo';

const Stack = createStackNavigator();

const MypageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={Temperature}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="DormInfo"
        component={DormInfo}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="NicknameInfo"
        component={NicknameInfo}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="PasswordInfo"
        component={PasswordInfo}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Dropout"
        component={DropOut}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="MyPenalty"
        component={MyPenalty}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="ProfileImageInfo"
        component={ProfileImageInfo}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MypageStack;
