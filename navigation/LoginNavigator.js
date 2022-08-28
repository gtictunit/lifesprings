import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SongsNavigator from "../navigation/SongsNavigator"
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const LoginNavigator = createStackNavigator(
    {
        Login: {screen:LoginScreen},
        Profile: {screen:ProfileScreen},
        Media:{screen: SongsNavigator},
    },
    {
        defaultNavigationOptions: {
          headerShown: false,
        },
      },
  );
export default createAppContainer(LoginNavigator);