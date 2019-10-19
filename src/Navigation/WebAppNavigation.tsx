import React, { useState } from 'react';
import { View } from 'react-native';
import { Link } from '@react-navigation/web';
import { createNavigator, SwitchRouter, SceneView } from '@react-navigation/core';
import extend from 'lodash/extend';
import get from 'lodash/get';
import SplashScreen from '../Screens/Splash/SplashScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import GamesListScreen from '../Screens/Games/GamesListScreen';
import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';
import CancelGameScreen from '../Screens/Games/CancelGameScreen';
import EditGameScreen from '../Screens/Games/EditGameScreen';
import GameChatScreen from '../Screens/Games/GameChatScreen';
import PlayersListScreen from '../Screens/Games/PlayersListScreen';
import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';
import PlanGameScreen from '../Screens/Plan/PlanGameScreen';
import ShareGameScreen from '../Screens/Plan/ShareGameScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import InfoScreen from '../Screens/Info/InfoScreen';
import LoggedInRoute from './LoggedInRoute';
import OnboardedRoute from './OnboardedRoute';

// See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js

const VIEWS = {
  SPLASH: 'SPLASH',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  CHECK_EMAIL: 'CHECK_EMAIL',
};

const Auth = () => {
  const [view, setView] = useState(VIEWS.SPLASH);
  const [params, setParams] = useState({});

  const handleNavigate = (payload) => {
    switch (payload.screen) {
      case 'SignupEmailScreen':
        setView(VIEWS.SIGNUP);
        break;
      case 'LoginScreen':
        setView(VIEWS.LOGIN);
        break;
      case 'CheckEmailScreen':
        setView(VIEWS.CHECK_EMAIL);
        break;
      default:
        break;
    }

    setParams(payload.params);
  };

  switch (view) {
    case VIEWS.SPLASH:
      return <SplashScreen onNavigate={handleNavigate} />;
    case VIEWS.SIGNUP:
      return <SignupEmailScreen onNavigate={handleNavigate} />;
    case VIEWS.LOGIN:
      return <LoginScreen onNavigate={handleNavigate} email={get(params, 'email', '')} />;
    case VIEWS.CHECK_EMAIL:
      return <CheckEmailScreen action={get(params, 'action', '')} email={get(params, 'email', '')} />;
    default:
      return null;
  }
};

const AppView = ({ descriptors, navigation }) => {
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  console.log({ activeKey, descriptor });

  return (
    <View style={{ flex: 1 }}>
      <h1>My Project</h1>
      <View
        style={{
          borderBottomWidth: '1px',
          borderBottomColor: '#99b',
          padding: 20,
        }}
      >
        <Link routeName="GamesListScreen" navigation={navigation}>
            Activities
        </Link>
        <Link routeName="SpotsListScreen" navigation={navigation}>
            Spots
        </Link>
        <Link routeName="PlanGameScreen" navigation={navigation}>
            Plan game
        </Link>
        <Link routeName="ProfileEditScreen" navigation={navigation}>
            Profile
        </Link>
        <Link routeName="InfoScreen" navigation={navigation}>
            About
        </Link>
      </View>
      <View style={{ flex: 1 }}>
        <SceneView
          navigation={descriptor.navigation}
          component={descriptor.getComponent()}
        />
      </View>
    </View>
  );
};

const ROUTES = [
  {
    name: 'OnboardingScreen',
    screen: OnboardingScreen,
    path: 'onboarding',
  },
  {
    name: 'GamesListScreen',
    screen: GamesListScreen,
    path: 'activities',
  },
  {
    name: 'GameDetailsScreen',
    screen: GameDetailsScreen,
    path: 'activities/:_id',
  },
  {
    name: 'CancelGameScreen',
    screen: CancelGameScreen,
    path: 'activities/cancel/:_id',
  },
  {
    name: 'EditGameScreen',
    screen: EditGameScreen,
    path: 'activities/edit/:_id',
  },
  {
    name: 'GameChatScreen',
    screen: GameChatScreen,
    path: 'activities/:roomId',
  },
  {
    name: 'PlayersListScreen',
    screen: PlayersListScreen,
    path: 'activities/players/:_id',
  },
  {
    name: 'SpotsListScreen',
    screen: SpotsListScreen,
    path: 'spots',
  },
  {
    name: 'SpotDetailsScreen',
    screen: SpotDetailsScreen,
    path: 'spots/:_id',
  },
  {
    name: 'PlanGameScreen',
    screen: PlanGameScreen,
    path: 'plan-activity',
  },
  {
    name: 'ShareGameScreen',
    screen: ShareGameScreen,
    path: 'share-activity',
  },
  {
    name: 'ProfileEditScreen',
    screen: ProfileEditScreen,
    path: 'profile-edit',
  },
  {
    name: 'InfoScreen',
    screen: InfoScreen,
    path: 'about',
  },
];

const WebAppLoggedInScreensNavigation = createNavigator(
  AppView,
  SwitchRouter(ROUTES.reduce((res, { name, screen: Screen, path }) => (
    extend(res, {
      [name]: {
        screen: ({ navigation }) => (
          <LoggedInRoute
            component={() => (
              <OnboardedRoute
                component={Screen}
                overlay={() => <OnboardingScreen navigation={navigation} />}
                // Child component props
                navigation={navigation}
              />
            )}
            overlay={Auth}
          />
        ),
        path,
      },
    })
  ), {})),
  {},
);

export default WebAppLoggedInScreensNavigation;
