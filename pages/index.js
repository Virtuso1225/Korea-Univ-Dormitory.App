import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/noto-sans-kr';
import Apploading from 'expo-app-loading';
import AuthPage from './AuthPage';
import { UserContext, ProgressContext } from '../components/contexts';
import MainPage from './MainPage';
import Spinner from '../components/src';

const Navigation = () => {
  const [fontsLoaded] = useFonts({
    ExtraLight: require('../fonts/SCDream2.otf'),
    Light: require('../fonts/SCDream3.otf'),
    Regular: require('../fonts/SCDream4.otf'),
    Medium: require('../fonts/SCDream5.otf'),
    Bold6: require('../fonts/SCDream6.otf'),
    ExtraBold: require('../fonts/SCDream7.otf'),
  });
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);
  if (!fontsLoaded) {
    return <Apploading />;
  }
  return (
    <NavigationContainer>
      {user.uid ? <MainPage /> : <AuthPage />}
      {/* <MainPage /> */}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
