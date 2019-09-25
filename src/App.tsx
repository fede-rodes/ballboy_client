// import './polyfills';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { Component } from 'react';
// import Crashes from 'appcenter-crashes';
// import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { StatusBar, View } from 'react-native';
import firebase from 'react-native-firebase';
// import { MenuProvider } from 'react-native-popup-menu';
import styled, { ThemeProvider } from 'styled-components/native';
// import { createAppContainer } from 'react-navigation';
// import config from './config';
import client from './GraphQL/ApolloClient';
// import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
// import createRootNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
// import { Events, getInitialEvent, IncomingLinks } from './Services/IncomingLinks';
import scTheme from './Themes/scTheme'; // styled-components theme
import { logNavigationState } from './utils';
// import { CodePushProvider } from './Context/CodePush';
import Text from './Components/Common/Text';
import {
  SPORTS,
  ACTIVITY_STATUSES,
  ATTENDEE_ACTIONS,
  CITIES,
} from './constants';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// const AppRootView = styled.View`
//   flex: 1;
//   flex-direction: column;
//   background-color: ${({ theme }) => theme.colors.black};
//   margin-bottom: ${getBottomSpace()}px;
//   margin-top: ${ifIphoneX() ? 30 : 0}px;
// `;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class App extends Component {
  state = {
    isReady: false,
  }

  // constructor() {
  //   super();
  //   Crashes.setEnabled(true).then(() => {});
  // }

  componentDidMount() {
  //   // signals codepush that the app is ready. If this is not called, CodePush rolls back
  //   // the last update.
  //   // codePush.notifyAppReady();

  //   // create android notification channel to display notifications while app in foreground
  //   const channel = new firebase.notifications.Android
  //     .Channel('notifications', 'Notification Channel', firebase.notifications.Android.Importance.Max)
  //     .setDescription('Notifications');
  //   firebase.notifications().android.createChannel(channel);

  //   firebase.messaging().hasPermission().then((result) => {
  //     console.log('has notification permission', result);
  //   });

  //   // notification opened with app in foreground/background
  //   this.notificationOpenedListener = firebase.notifications().onNotificationOpened(
  //     (notificationOpen) => {
  //       console.log('notificationOpened', notificationOpen);
  //     },
  //   );

  //   this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(
  //     (notification) => {
  //       console.log('notificationDisplayed', notification);
  //     },
  //   );

  //   // notification received while app in foreground
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     console.log('notificationReceived', notification);
  //     // display the notification in system tray. Does not happen by default if app in foreground
  //     notification.android.setChannelId('notifications');
  //     notification.android.setSmallIcon('@drawable/notification_icon');
  //     notification.android.setColor('#00ff00');

  //     firebase.notifications().displayNotification(notification);
  //   });

  //   firebase.notifications().getInitialNotification().then((notification) => {
  //     if (notification) {
  //       // app was opened while closed by clicking a notification
  //       console.log('initialNotification', notification);
  //     }
  //   });

  //   firebase.links().getInitialLink()
  //     .then((url) => {
  //       if (url) {
  //         console.log('LINKING: App opened from', url);
  //       } else {
  //         console.log('LINKING: App not opened through url');
  //       }
  //     });

  //   firebase.links().onLink((url) => {
  //     console.log('LINKING: App received link: ', url);
  //   });

  //   IncomingLinks.on(Events.MAGIC_LINK_LOGIN, (magicToken) => {
  //     this.router._navigation.navigate('ConfirmMagicTokenScreen', { magicToken });
  //   });

  //   IncomingLinks.on(Events.GAME_OPENED, (uuid) => {
  //     this.router._navigation.navigate('GameDetailsScreen', { uuid });
  //   });

  //   getInitialEvent().then((event) => {
  //     if (event
  //       && event.type
  //       && [Events.MAGIC_LINK_LOGIN, Events.GAME_OPENED].includes(event.type)
  //     ) {
  //       IncomingLinks.emitEvent(event);
  //     }
  //   });
  }

  // componentWillUnmount() {
  //   // Linking.removeEventListener('url', this.appWokeUp);
  //   IncomingLinks.removeListener(Events.MAGIC_LINK_LOGIN, () => {});
  //   IncomingLinks.removeListener(Events.GAME_OPENED, () => {});
  // }

  // NOTE: https://github.com/Microsoft/react-native-code-push/issues/516#issuecomment-275688344
  // To remove warning caused by required listener
  // update: removed this, seems only necessary if using codePush.sync()
  // eslint-disable-next-line
  // codePushDownloadDidProgress(progress) {}

  async loadResourcesAsync() {
    await Promise.all([
      // Asset.loadAsync([
      //   require('./assets/images/robot-dev.png'),
      //   require('./assets/images/robot-prod.png'),
      // ]),
      Font.loadAsync({
        'Rajdhani-Regular': require('../assets/fonts/Rajdhani-Regular.ttf'),
        'Rajdhani-SemiBold': require('../assets/fonts/Rajdhani-SemiBold.ttf'),
        'Rajdhani-Bold': require('../assets/fonts/Rajdhani-Bold.ttf'),
      }),
    ]);
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={scTheme}>
          <UserProvider>
            <SpotFiltersProvider>
                {/* <MenuProvider> */}
                  {/* <AppRootView> */}
                  <View>
                      <StatusBar barStyle="light-content" />
                        <View>
                          <Text>Open up App.tsx to start working on your app! HELLOOOOO TIOT</Text>
                          <Text>{JSON.stringify(SPORTS)}</Text>
                          <Text>{JSON.stringify(ACTIVITY_STATUSES)}</Text>
                          <Text>{JSON.stringify(ATTENDEE_ACTIONS)}</Text>
                          <Text>{JSON.stringify(CITIES)}</Text>
                        </View>
                      </View>
                    {/* <ConnectionCheck /> */}
                    {/* <AppNavigation
                      ref={(ref) => {
                        this.router = ref;
                        globalRefs.rootNavigator = ref;
                      }}
                      // See: https://reactnavigation.org/docs/en/screen-tracking.html
                      onNavigationStateChange={(prevState, currState) => {
                        if (config.logRoute) logNavigationState();
                        const currScreen = getActiveRouteName(currState);
                        const prevScreen = getActiveRouteName(prevState);
                        if (prevScreen !== currScreen) {
                          firebase.analytics().setCurrentScreen(currScreen);
                        }
                      }}
                    /> */}
                  {/* </AppRootView> */}
                {/* </MenuProvider> */}
            </SpotFiltersProvider>
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import {
//   SPORTS,
//   ACTIVITY_STATUSES,
//   ATTENDEE_ACTIONS,
//   CITIES,
// } from './constants';

// const App = () => (
//   <View style={styles.container}>
//     <Text>Open up App.tsx to start working on your app! HELLOOOOO TIOT</Text>
//     <Text>{JSON.stringify(SPORTS)}</Text>
//     <Text>{JSON.stringify(ACTIVITY_STATUSES)}</Text>
//     <Text>{JSON.stringify(ATTENDEE_ACTIONS)}</Text>
//     <Text>{JSON.stringify(CITIES)}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default App;
