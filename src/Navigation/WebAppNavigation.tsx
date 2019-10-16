import React from 'react';
import { Platform } from 'react-native';
import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import SplashScreen from '../Screens/Splash/SplashScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';
import GamesListScreen from '../Screens/Games/GamesListScreen';
import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';

import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';

const WebAppLoggedOutScreensNavigation = createSwitchNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      path: '',
    },
    LoginScreen: {
      screen: LoginScreen,
      path: 'login',
    },
    SignupEmailScreen: {
      screen: SignupEmailScreen,
      path: 'signup',
    },
    CheckEmailScreen: {
      screen: CheckEmailScreen,
      path: 'verify-email',
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const WebAppLoggedInScreensNavigation = createSwitchNavigator(
  {
    GamesListScreen: {
      screen: GamesListScreen,
      path: 'activities',
    },
    GameDetailsScreen: {
      screen: GameDetailsScreen,
      path: 'activities/:_id',
    },
    // LoginScreen: {
    //   screen: LoginScreen,
    //   path: 'login',
    // },
    // SignupEmailScreen: {
    //   screen: SignupScreen,
    //   path: 'signup',
    // },
  },
  {
    initialRouteName: 'GamesListScreen',
  },
);

const WebAppNavigation = createSwitchNavigator(
  {
    LoggedOutScreens: {
      screen: ({ navigation }) => (
        <LoggedOutRoute
          component={createBrowserApp(WebAppLoggedOutScreensNavigation)}
          onLoggedIn={() => {
            console.log('handle logged in!');
            navigation.navigate('LoggedInScreens');
          }} // TODO: if history is defined, goBAck, otherwise redirect to Activities
        />
      ),
      path: '',
    },
    LoggedInScreens: {
      screen: ({ navigation }) => (
        <LoggedInRoute
          component={createBrowserApp(WebAppLoggedInScreensNavigation)}
          onLoggedOut={() => {
            console.log('handle logged out!');
            navigation.navigate('LoggedOutScreens');
          }}
        />
      ),
      path: 'activities',
    },
  },
  {
    initialRouteName: 'LoggedOutScreens',
  },
);

// const WebAppNavigation = Platform.select({
//   web: createBrowserApp(WebAppNavigation),
//   default: null,
// });

export default WebAppNavigation;
