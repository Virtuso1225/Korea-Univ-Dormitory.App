import React from 'react';
// import { StatusBar } from 'react-native';
import Navigation from '../pages';
import { UserProvider, ProgressProvider } from './contexts';

const App = () => (
  <ProgressProvider>
    <UserProvider>
      {/* <StatusBar
          backgroundColor='grey'
          barStyle="dark-content"
        /> */}
      <Navigation />
    </UserProvider>
  </ProgressProvider>
);

export default App;
