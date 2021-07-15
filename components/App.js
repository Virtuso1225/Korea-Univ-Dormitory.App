import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigation';
import { UserProvider, ProgressProvider} from './contexts';

const App = () => {
  return (    
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
};

export default App;
