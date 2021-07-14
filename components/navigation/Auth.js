import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import Front from '../front/Front';
import Register from '../register/Register';

const Stack = createStackNavigator();



const Auth = () => {
    const theme = useContext(ThemeContext);


  return (
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

  );
};

export default Auth;
