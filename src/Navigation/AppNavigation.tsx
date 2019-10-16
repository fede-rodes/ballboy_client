import { Platform } from 'react-native';
import { createBrowserApp } from '@react-navigation/web';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {
  createStackNavigator,
  // createSwitchNavigator,
  // createBottomTabNavigator,
} from 'react-navigation-stack';
import {
  // createStackNavigator,
  // createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import {
  OnboardingNav,
  SplashNav,
  SpotSearchNav,
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  InfoNav,
} from './Navigators';
import NavBar from '../Components/Common/NavBar';
import DebugScreen from '../Screens/Debug/DebugScreen';

import SplashScreen from '../Screens/Splash/SplashScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupScreen from '../Screens/Auth/SignupEmailScreen';


const MainTabsNav = createBottomTabNavigator({
  SpotSearchTab: { screen: SpotSearchNav },
  GameSearchTab: { screen: GameSearchNav },
  ProfileTab: { screen: ProfileNav },
  InfoTab: { screen: InfoNav },
}, {
  tabBarComponent: NavBar,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'GameSearchTab',
});

const MainNav = createStackNavigator({
  MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
  PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
}, {
  initialRouteName: 'MainTabs',
});

// const AppNavigation = createSwitchNavigator({
//   SplashScreen: { screen: SplashNav }, // LoggedOut
//   OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
//   MainNav: { screen: MainNav }, // LoggedIn
//   DebugNav: { screen: DebugScreen },
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'SplashScreen',
//   tabBarComponent: () => null,
// });

const NativeAppNavigation = createSwitchNavigator({
  SplashScreen: { screen: SplashNav }, // LoggedOut
  OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
  MainNav: { screen: MainNav }, // LoggedIn
  DebugNav: { screen: DebugScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

const WebAppNavigation = createSwitchNavigator(
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
      screen: SignupScreen,
      path: 'signup',
    },
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

// const AppNavigation = Platform.select({
//   web: createBrowserApp(WebAppNavigation),
//   default: createAppContainer(NativeAppNavigation),
// });

// export default AppNavigation;

export default Platform.OS === 'web' ? createBrowserApp(WebAppNavigation) : createAppContainer(NativeAppNavigation);

// const createApp = Platform.select({
//   web: createBrowserApp,
//   default: createAppContainer,
// });

// const AppContainer = createApp(
//   createSwitchNavigator(
//     {
//       SplashScreen: {
//         screen: SplashScreen,
//         path: '',
//       },
//       LoginScreen: {
//         screen: LoginScreen,
//         path: 'login',
//       },
//       SignupEmailScreen: {
//         screen: SignupScreen,
//         path: 'signup',
//       },
//     },
//     {
//       initialRouteName: 'SplashScreen',
//     },
//   ),
// );

// export default AppContainer;


// const createRootNavigator = (loggedIn = false) => (
// const createRootNavigator = ({ loadingUser, user }) => (
//   createSwitchNavigator({
//     SplashScreen: { screen: SplashNav }, // LoggedOut
//     OnboardingScreen: { screen: OnboardingScreen },
//     MainNav: { screen: MainNav }, // LoggedIn
//     DebugNav: { screen: DebugScreen },
//   }, {
//     // Default config for all screens
//     headerMode: 'none',
//     // initialRouteName: loggedIn ? 'MainNav' : 'SplashScreen',
//     initialRouteName: !loadingUser && user && user.location ? 'MainNav' : 'SplashScreen',
//     tabBarComponent: () => null,
//   })
// );

// export default createRootNavigator;

// export const createRootNavigator = (signedIn = false) => {
//   return SwitchNavigator(
//     {
//       SignedIn: {
//         screen: SignedIn
//       },
//       SignedOut: {
//         screen: SignedOut
//       }
//     },
//     {
//       initialRouteName: signedIn ? "SignedIn" : "SignedOut"
//     }
//   );
// };

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // Dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};


// import { Platform } from 'react-native';
// import { createBrowserApp } from '@react-navigation/web';
// import {
//   createAppContainer,
//   createSwitchNavigator,
// } from 'react-navigation';
// import {
//   createStackNavigator,
//   // createSwitchNavigator,
//   // createBottomTabNavigator,
// } from 'react-navigation-stack';
// import {
//   // createStackNavigator,
//   // createSwitchNavigator,
//   createBottomTabNavigator,
// } from 'react-navigation-tabs';
// import {
//   OnboardingNav,
//   SplashNav,
//   SpotSearchNav,
//   GameSearchNav,
//   PlanGameNav,
//   ProfileNav,
//   InfoNav,
// } from './Navigators';
// import NavBar from '../Components/Common/NavBar';
// import DebugScreen from '../Screens/Debug/DebugScreen';

// const MainTabsNav = createBottomTabNavigator({
//   SpotSearchTab: { screen: SpotSearchNav },
//   GameSearchTab: { screen: GameSearchNav },
//   ProfileTab: { screen: ProfileNav },
//   InfoTab: { screen: InfoNav },
// }, {
//   tabBarComponent: NavBar,
//   tabBarPosition: 'bottom',
//   animationEnabled: false,
//   swipeEnabled: false,
//   initialRouteName: 'GameSearchTab',
// });

// const MainNav = createStackNavigator({
//   MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
//   PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
// }, {
//   initialRouteName: 'MainTabs',
// });

// const AppNavigation = createSwitchNavigator({
//   SplashScreen: { screen: SplashNav }, // LoggedOut
//   OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
//   MainNav: { screen: MainNav }, // LoggedIn
//   DebugNav: { screen: DebugScreen },
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'SplashScreen',
//   tabBarComponent: () => null,
// });

// export default Platform.OS === 'web' ? createBrowserApp(AppNavigation) : createAppContainer(AppNavigation);

// // const createRootNavigator = (loggedIn = false) => (
// // const createRootNavigator = ({ loadingUser, user }) => (
// //   createSwitchNavigator({
// //     SplashScreen: { screen: SplashNav }, // LoggedOut
// //     OnboardingScreen: { screen: OnboardingScreen },
// //     MainNav: { screen: MainNav }, // LoggedIn
// //     DebugNav: { screen: DebugScreen },
// //   }, {
// //     // Default config for all screens
// //     headerMode: 'none',
// //     // initialRouteName: loggedIn ? 'MainNav' : 'SplashScreen',
// //     initialRouteName: !loadingUser && user && user.location ? 'MainNav' : 'SplashScreen',
// //     tabBarComponent: () => null,
// //   })
// // );

// // export default createRootNavigator;

// // export const createRootNavigator = (signedIn = false) => {
// //   return SwitchNavigator(
// //     {
// //       SignedIn: {
// //         screen: SignedIn
// //       },
// //       SignedOut: {
// //         screen: SignedOut
// //       }
// //     },
// //     {
// //       initialRouteName: signedIn ? "SignedIn" : "SignedOut"
// //     }
// //   );
// // };

// export const getActiveRouteName = (navigationState) => {
//   if (!navigationState) {
//     return null;
//   }

//   const route = navigationState.routes[navigationState.index];
//   // Dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }

//   return route.routeName;
// };
