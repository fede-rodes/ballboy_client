import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { createBrowserApp, Link } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import {
  createNavigator,
  SwitchRouter,
  getActiveChildNavigationOptions,
  SceneView,
} from '@react-navigation/core';

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

// TODO: create single component out of this, using state to keep the displayed view
// const WebAppLoggedOutScreensNavigation = createSwitchNavigator(
//   {
//     SplashScreen: {
//       screen: SplashScreen,
//       path: '',
//     },
//     LoginScreen: {
//       screen: LoginScreen,
//       path: 'login',
//     },
//     SignupEmailScreen: {
//       screen: SignupEmailScreen,
//       path: 'signup',
//     },
//     CheckEmailScreen: {
//       screen: CheckEmailScreen,
//       path: 'verify-email',
//     },
//   },
//   {
//     initialRouteName: 'SplashScreen',
//   },
// );

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

  // const childProps = {
  //   onNavigate: handleNavigate,
  //   ...params, // { action, email }
  // };

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

// const WebAppLoggedInScreensNavigation = createSwitchNavigator(
//   {
//     GamesListScreen: {
//       screen: GamesListScreen,
//       path: 'activities',
//     },
//     GameDetailsScreen: {
//       screen: GameDetailsScreen,
//       path: 'activities/:_id',
//     },
//     CancelGameScreen: {
//       screen: CancelGameScreen,
//       path: 'activities/cancel/:_id',
//     },
//     EditGameScreen: {
//       screen: EditGameScreen,
//       path: 'activities/edit/:_id',
//     },
//     SpotsListScreen: {
//       screen: SpotsListScreen,
//       path: 'spots',
//     },
//     SpotDetailsScreen: {
//       screen: SpotDetailsScreen,
//       path: 'spots/:_id',
//     },
//   },
//   {
//     initialRouteName: 'GamesListScreen',
//   },
// );

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
          // borderBottomStyle: 'solid',
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

// console.log('ROUTES', ROUTES.reduce((res, { name, screen: Screen, path }) => (
//   extend(res, { [name]: { screen: Screen, path } })
// ), {}));

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
            onLoggedOut={() => {
              console.log('handle logged out!');
              // navigation.navigate('LoggedOutScreens');
            }}
            overlay={Auth}
            // Child component props
            // navigation={navigation}
          />
        ),
        path,
      },
    })
  ), {})),
  {},
);

// const WebAppNavigation = createSwitchNavigator(
//   {
//     LoggedOutScreens: {
//       screen: ({ navigation }) => (
//         <LoggedOutRoute
//           component={createBrowserApp(WebAppLoggedOutScreensNavigation)}
//           onLoggedIn={({ location }) => {
//             console.log('handle logged in!', { location });
//             navigation.navigate('LoggedInScreens');
//             // navigation.navigate(location ? 'GamesListScreen' : 'OnboardingScreen');
//           }} // TODO: if history is defined, goBAck, otherwise redirect to Activities
//         />
//       ),
//       path: '',
//     },
//     LoggedInScreens: {
//       screen: ({ navigation }) => (
//         <LoggedInRoute
//           component={createBrowserApp(WebAppLoggedInScreensNavigation)}
//           onLoggedOut={() => {
//             console.log('handle logged out!');
//             navigation.navigate('LoggedOutScreens');
//           }}
//         />
//       ),
//       // path: 'activities',
//       path: 'onboarding',
//     },
//   },
//   {
//     initialRouteName: 'LoggedOutScreens',
//   },
// );

// const WebAppNavigation = createBrowserApp(WebAppLoggedInScreensNavigation);

// export default WebAppNavigation;

export default WebAppLoggedInScreensNavigation;


// import React from 'react';
// import { View } from 'react-native';
// import { createBrowserApp, Link } from '@react-navigation/web';
// import { createSwitchNavigator } from 'react-navigation';

// import {
//   createNavigator,
//   SwitchRouter,
//   getActiveChildNavigationOptions,
//   SceneView,
// } from '@react-navigation/core';


// import SplashScreen from '../Screens/Splash/SplashScreen';
// import LoginScreen from '../Screens/Auth/LoginScreen';
// import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
// import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';

// import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';

// import GamesListScreen from '../Screens/Games/GamesListScreen';
// import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';
// import CancelGameScreen from '../Screens/Games/CancelGameScreen';
// import EditGameScreen from '../Screens/Games/EditGameScreen';
// import GameChatScreen from '../Screens/Games/GameChatScreen';
// import PlayersListScreen from '../Screens/Games/PlayersListScreen';

// import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
// import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';

// import PlanGameScreen from '../Screens/Plan/PlanGameScreen';
// import ShareGameScreen from '../Screens/Plan/ShareGameScreen';

// import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';

// import InfoScreen from '../Screens/Info/InfoScreen';

// import LoggedOutRoute from './LoggedOutRoute';
// import LoggedInRoute from './LoggedInRoute';

// // See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js

// const WebAppLoggedOutScreensNavigation = createSwitchNavigator(
//   {
//     SplashScreen: {
//       screen: SplashScreen,
//       path: '',
//     },
//     LoginScreen: {
//       screen: LoginScreen,
//       path: 'login',
//     },
//     SignupEmailScreen: {
//       screen: SignupEmailScreen,
//       path: 'signup',
//     },
//     CheckEmailScreen: {
//       screen: CheckEmailScreen,
//       path: 'verify-email',
//     },
//   },
//   {
//     initialRouteName: 'SplashScreen',
//   },
// );

// // const WebAppLoggedInScreensNavigation = createSwitchNavigator(
// //   {
// //     GamesListScreen: {
// //       screen: GamesListScreen,
// //       path: 'activities',
// //     },
// //     GameDetailsScreen: {
// //       screen: GameDetailsScreen,
// //       path: 'activities/:_id',
// //     },
// //     CancelGameScreen: {
// //       screen: CancelGameScreen,
// //       path: 'activities/cancel/:_id',
// //     },
// //     EditGameScreen: {
// //       screen: EditGameScreen,
// //       path: 'activities/edit/:_id',
// //     },
// //     SpotsListScreen: {
// //       screen: SpotsListScreen,
// //       path: 'spots',
// //     },
// //     SpotDetailsScreen: {
// //       screen: SpotDetailsScreen,
// //       path: 'spots/:_id',
// //     },
// //   },
// //   {
// //     initialRouteName: 'GamesListScreen',
// //   },
// // );

// const AppView = ({ descriptors, navigation }) => {
//   const activeKey = navigation.state.routes[navigation.state.index].key;
//   const descriptor = descriptors[activeKey];

//   return (
//     <View style={{ flex: 1 }}>
//       <h1>My Project</h1>
//       <View
//         style={{
//           borderBottomWidth: '1px',
//           // borderBottomStyle: 'solid',
//           borderBottomColor: '#99b',
//           padding: 20,
//         }}
//       >
//         <Link routeName="GamesListScreen" navigation={navigation}>
//             Activities
//         </Link>
//         <Link routeName="SpotsListScreen" navigation={navigation}>
//             Spots
//         </Link>
//         <Link routeName="PlanGameScreen" navigation={navigation}>
//             Plan game
//         </Link>
//         <Link routeName="ProfileEditScreen" navigation={navigation}>
//             Profile
//         </Link>
//         <Link routeName="InfoScreen" navigation={navigation}>
//             About
//         </Link>
//       </View>
//       <View style={{ flex: 1 }}>
//         <SceneView
//           navigation={descriptor.navigation}
//           component={descriptor.getComponent()}
//         />
//       </View>
//     </View>
//   );
// };


// const WebAppLoggedInScreensNavigation = createNavigator(
//   AppView,
//   SwitchRouter({
//     OnboardingScreen: {
//       screen: OnboardingScreen,
//       path: 'onboarding',
//     },
//     GamesListScreen: {
//       screen: GamesListScreen,
//       path: 'activities',
//     },
//     GameDetailsScreen: {
//       screen: GameDetailsScreen,
//       path: 'activities/:_id',
//     },
//     CancelGameScreen: {
//       screen: CancelGameScreen,
//       path: 'activities/cancel/:_id',
//     },
//     EditGameScreen: {
//       screen: EditGameScreen,
//       path: 'activities/edit/:_id',
//     },
//     GameChatScreen: {
//       screen: GameChatScreen,
//       path: 'activities/:roomId',
//     },
//     PlayersListScreen: {
//       screen: PlayersListScreen,
//       path: 'activities/players/:_id',
//     },
//     SpotsListScreen: {
//       screen: SpotsListScreen,
//       path: 'spots',
//     },
//     SpotDetailsScreen: {
//       screen: SpotDetailsScreen,
//       path: 'spots/:_id',
//     },
//     PlanGameScreen: {
//       screen: PlanGameScreen,
//       path: 'plan-activity',
//     },
//     ShareGameScreen: {
//       screen: ShareGameScreen,
//       path: 'share-activity',
//     },
//     ProfileEditScreen: {
//       screen: ProfileEditScreen,
//       path: 'profile-edit',
//     },
//     InfoScreen: {
//       screen: InfoScreen,
//       path: 'about',
//     },
//   }),
//   {},
// );

// const WebAppNavigation = createSwitchNavigator(
//   {
//     LoggedOutScreens: {
//       screen: ({ navigation }) => (
//         <LoggedOutRoute
//           component={createBrowserApp(WebAppLoggedOutScreensNavigation)}
//           onLoggedIn={({ location }) => {
//             console.log('handle logged in!', { location });
//             navigation.navigate('LoggedInScreens');
//             // navigation.navigate(location ? 'GamesListScreen' : 'OnboardingScreen');
//           }} // TODO: if history is defined, goBAck, otherwise redirect to Activities
//         />
//       ),
//       path: '',
//     },
//     LoggedInScreens: {
//       screen: ({ navigation }) => (
//         <LoggedInRoute
//           component={createBrowserApp(WebAppLoggedInScreensNavigation)}
//           onLoggedOut={() => {
//             console.log('handle logged out!');
//             navigation.navigate('LoggedOutScreens');
//           }}
//         />
//       ),
//       // path: 'activities',
//       path: 'onboarding',
//     },
//   },
//   {
//     initialRouteName: 'LoggedOutScreens',
//   },
// );

// export default WebAppNavigation;


// import React from 'react';
// import { View } from 'react-native';
// import { createBrowserApp } from '@react-navigation/web';
// import { createSwitchNavigator } from 'react-navigation';

// import SplashScreen from '../Screens/Splash/SplashScreen';
// import LoginScreen from '../Screens/Auth/LoginScreen';
// import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
// import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';

// import GamesListScreen from '../Screens/Games/GamesListScreen';
// import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';
// import CancelGameScreen from '../Screens/Games/CancelGameScreen';
// import EditGameScreen from '../Screens/Games/EditGameScreen';

// import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
// import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';

// import LoggedOutRoute from './LoggedOutRoute';
// import LoggedInRoute from './LoggedInRoute';

// const WebAppLoggedOutScreensNavigation = createSwitchNavigator(
//   {
//     SplashScreen: {
//       screen: SplashScreen,
//       path: '',
//     },
//     LoginScreen: {
//       screen: LoginScreen,
//       path: 'login',
//     },
//     SignupEmailScreen: {
//       screen: SignupEmailScreen,
//       path: 'signup',
//     },
//     CheckEmailScreen: {
//       screen: CheckEmailScreen,
//       path: 'verify-email',
//     },
//   },
//   {
//     initialRouteName: 'SplashScreen',
//   },
// );

// const WebAppLoggedInScreensNavigation = createSwitchNavigator(
//   {
//     GamesListScreen: {
//       screen: GamesListScreen,
//       path: 'activities',
//     },
//     GameDetailsScreen: {
//       screen: GameDetailsScreen,
//       path: 'activities/:_id',
//     },
//     CancelGameScreen: {
//       screen: CancelGameScreen,
//       path: 'activities/cancel/:_id',
//     },
//     EditGameScreen: {
//       screen: EditGameScreen,
//       path: 'activities/edit/:_id',
//     },
//     SpotsListScreen: {
//       screen: SpotsListScreen,
//       path: 'spots',
//     },
//     SpotDetailsScreen: {
//       screen: SpotDetailsScreen,
//       path: 'spots/:_id',
//     },
//   },
//   {
//     initialRouteName: 'GamesListScreen',
//   },
// );

// const WebAppNavigation = createSwitchNavigator(
//   {
//     LoggedOutScreens: {
//       screen: ({ navigation }) => (
//         <LoggedOutRoute
//           component={createBrowserApp(WebAppLoggedOutScreensNavigation)}
//           onLoggedIn={() => {
//             console.log('handle logged in!');
//             navigation.navigate('LoggedInScreens');
//           }} // TODO: if history is defined, goBAck, otherwise redirect to Activities
//         />
//       ),
//       path: '',
//     },
//     LoggedInScreens: {
//       screen: ({ navigation }) => (
//         <LoggedInRoute
//           component={createBrowserApp(WebAppLoggedInScreensNavigation)}
//           onLoggedOut={() => {
//             console.log('handle logged out!');
//             navigation.navigate('LoggedOutScreens');
//           }}
//         />
//       ),
//       path: 'activities',
//     },
//   },
//   {
//     initialRouteName: 'LoggedOutScreens',
//   },
// );

// export default WebAppNavigation;
