import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
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

const AppNavigation = createSwitchNavigator({
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

export default createAppContainer(AppNavigation);

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
