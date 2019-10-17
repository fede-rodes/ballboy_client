import React from 'react';
import { View } from 'react-native';
import { createBrowserApp, Link } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import {
  createNavigator,
  SwitchRouter,
  getActiveChildNavigationOptions,
  SceneView,
} from '@react-navigation/core';


import SplashScreen from '../Screens/Splash/SplashScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';

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

import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';

// See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js

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

class AppView extends React.Component {
  render() {
    const { descriptors, navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];

    return (
      <View style={{ flex: 1 }}>
        <h1>My Project</h1>
        <View
          style={{
            borderBottom: '1px solid #99b',
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
        </View>
        <View style={{ flex: 1 }}>
          <SceneView
            navigation={descriptor.navigation}
            component={descriptor.getComponent()}
          />
        </View>
      </View>
    );
  }
}

const WebAppLoggedInScreensNavigation = createNavigator(
  AppView,
  SwitchRouter({
    GamesListScreen: {
      screen: GamesListScreen,
      path: 'activities',
    },
    GameDetailsScreen: {
      screen: GameDetailsScreen,
      path: 'activities/:_id',
    },
    CancelGameScreen: {
      screen: CancelGameScreen,
      path: 'activities/cancel/:_id',
    },
    EditGameScreen: {
      screen: EditGameScreen,
      path: 'activities/edit/:_id',
    },
    GameChatScreen: {
      screen: GameChatScreen,
      path: 'activities/:roomId',
    },
    PlayersListScreen: {
      screen: EditGameScreen,
      path: 'activities/players/:_id',
    },
    SpotsListScreen: {
      screen: SpotsListScreen,
      path: 'spots',
    },
    SpotDetailsScreen: {
      screen: SpotDetailsScreen,
      path: 'spots/:_id',
    },
    PlanGameScreen: {
      screen: PlanGameScreen,
      path: 'plan-activity',
    },
    ShareGameScreen: {
      screen: ShareGameScreen,
      path: 'share-activity',
    },
    ProfileEditScreen: {
      screen: ProfileEditScreen,
      path: 'profile-edit',
    },
  }),
  {},
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
      // path: 'plan-activity',
    },
  },
  {
    initialRouteName: 'LoggedOutScreens',
  },
);

export default WebAppNavigation;


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
