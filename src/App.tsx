// import './polyfills';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import React, { Component } from 'react';
// import Crashes from 'appcenter-crashes';
// import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { StatusBar, View } from 'react-native';
// import firebase from 'react-native-firebase';
import { MenuProvider } from 'react-native-popup-menu';
import styled, { ThemeProvider } from 'styled-components/native';
// import { createAppContainer } from 'react-navigation';
import client from './GraphQL/ApolloClient';
import AppNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
// import createRootNavigation, { getActiveRouteName } from './Navigation/AppNavigation';
import { getBottomSpace, ifIphoneX } from './iphoneHelpers';
import { UserProvider } from './Context/User';
import { SpotFiltersProvider } from './Context/SpotFilters';
// import { Events, getInitialEvent, IncomingLinks } from './Services/IncomingLinks';
import scTheme from './Themes/scTheme'; // styled-components theme
// import { logNavigationState } from './utils';
// import { CodePushProvider } from './Context/CodePush';
import Text from './Components/Common/Text';
import Images from './Themes/Images';
import {
  SPORTS,
  ACTIVITY_STATUSES,
  ATTENDEE_ACTIONS,
  CITIES,
} from './constants';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const AppRootView = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.orange};
  margin-bottom: ${getBottomSpace()}px;
  margin-top: ${ifIphoneX() ? 30 : 0}px;
`;``
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
      Asset.loadAsync([
        require('../assets/images/sportyspots-logo.png'),
        require('../assets/images/illustration-wizard-1.png'),
        require('../assets/images/illustration-wizard-2.png'),
        require('../assets/images/illustration-wizard-3.png'),
        require('../assets/images/illustration-share-location.png'),
        require('../assets/images/create-profile-avatar.png'),
        require('../assets/images/spot-open-circle.png'),
        require('../assets/images/activity-cancelled-visual.png'),
        require('../assets/images/activity-success-visual.png'),
        require('../assets/images/activity-confirm-visual.png'),
        require('../assets/images/check-email.png'),
        require('../assets/images/location-onboarding.png'),
        require('../assets/images/link-expired.png'),
        require('../assets/images/noactivities-illustration.png'),
        require('../assets/icons/basketball.png'),
        require('../assets/icons/volleyball.png'),
        require('../assets/icons/volleyball.png'),
        require('../assets/icons/football.png'),
        require('../assets/icons/boules.png'),
        require('../assets/icons/skating.png'),
        require('../assets/icons/table_tennis.png'),
        require('../assets/icons/tennis.png'),
        require('../assets/icons/bootcamp.png'),
      ]),
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
                <MenuProvider>
                  <AppRootView>
                    <StatusBar barStyle="light-content" />
                    {/* <ConnectionCheck /> */}
                    {/* <View>
                      <Text>Open up App.tsx to start working on your app! HELLOOOOO TIOT</Text>
                      <Text>{JSON.stringify(SPORTS)}</Text>
                      <Text>{JSON.stringify(ACTIVITY_STATUSES)}</Text>
                      <Text>{JSON.stringify(ATTENDEE_ACTIONS)}</Text>
                      <Text>{JSON.stringify(CITIES)}</Text>
                    </View> */}
                    <AppNavigation
                      // ref={(ref) => { this.router = ref; }}
                      // See: https://reactnavigation.org/docs/en/screen-tracking.html
                      onNavigationStateChange={(prevState, currState) => {
                        const currScreen = getActiveRouteName(currState);
                        const prevScreen = getActiveRouteName(prevState);
                        // if (prevScreen !== currScreen) {
                        //   firebase.analytics().setCurrentScreen(currScreen);
                        // }
                      }}
                    />
                  </AppRootView>
                </MenuProvider>
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
