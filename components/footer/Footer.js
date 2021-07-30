import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notice from '../notice/Notice';
import {
  Megaphone,
  ActivatedMegaphone,
  HomeIcon,
  MypageIcon,
} from '../../assets/Svgs';
import Main from '../main/Main';
import { NavigationWrapper, TextWrapper } from './FooterStyle';
import MypageStack from '../mypage/MypageStack';

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#f9f7f4',
          shadowOffset: {
            height: -10,
          },
          shadowOpacity: 1,
          shadowColor: 'rgba(222,215, 202, 0.37)',
          border: 'none',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => (
            <NavigationWrapper>
              <HomeIcon />
              <TextWrapper activated={focused}>홈</TextWrapper>
            </NavigationWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="공지사항"
        component={Notice}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavigationWrapper>
              {focused ? (
                <ActivatedMegaphone />
              ) : (
                <Megaphone
                  widthProp={18.78}
                  heightProp={18.59}
                  colorProp="#404040"
                />
              )}
              <TextWrapper activated={focused}>공지사항</TextWrapper>
            </NavigationWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavigationWrapper>
              <MypageIcon
                widthProp={16.48}
                heightProp={18.32}
                colorProp="#404040"
                fillProp={focused ? '#404040' : 'none'}
              />
              <TextWrapper activated={focused}>마이페이지</TextWrapper>
            </NavigationWrapper>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Footer;
