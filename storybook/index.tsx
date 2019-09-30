// import '../src/polyfills';
import '../src/prototypes';
import './setup-faker';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import React from 'react';
// import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'styled-components/native';
import { SpotFiltersProvider } from '../src/Context/SpotFilters';
import { ApolloMockProvider } from '../src/GraphQL/ApolloMockClient';
import { loadStories } from './storyLoader';
import scTheme from '../src/Themes/scTheme'; // styled-components theme

class LoadAssets extends React.Component {
  state = {
    isReady: false,
  }

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
    const { children } = this.props;
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

    return children;
  }
}

addDecorator(story => (
  <LoadAssets>
    <ApolloMockProvider>
      <ThemeProvider theme={scTheme}>
        <SpotFiltersProvider>
          <MenuProvider>
            {story()}
          </MenuProvider>
        </SpotFiltersProvider>
      </ThemeProvider>
    </ApolloMockProvider>
  </LoadAssets>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
// AppRegistry.registerComponent(name, () => StorybookUI);
export default StorybookUI;