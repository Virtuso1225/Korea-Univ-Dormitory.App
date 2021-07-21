import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthPage from './AuthPage';
import { UserContext, ProgressContext } from '../components/contexts';
import MainPage from './MainPage';
import { Spinner } from '../components/src';

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {/* {user.uid ? <MainPage /> : <AuthPage />} */}
      <MainPage />
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;
