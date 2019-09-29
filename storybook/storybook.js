import '../src/App/prototypes';
import Constants from 'expo-constants';
import React from 'react';
// import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'styled-components/native';
import { SpotFiltersProvider } from '../src/App/Context/SpotFilters';
import { ApolloMockProvider } from '../src/App/GraphQL/ApolloMockClient';
import { loadStories } from './storyLoader';
import scTheme from '../src/App/Themes/scTheme'; // styled-components theme

const { name } = Constants.manifest

addDecorator(story => (
  <ApolloMockProvider>
    <ThemeProvider theme={scTheme}>
      <SpotFiltersProvider>
        <MenuProvider>
          {story()}
        </MenuProvider>
      </SpotFiltersProvider>
    </ThemeProvider>
  </ApolloMockProvider>
));

// Import stories
configure(loadStories, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });

// If you are using React Native vanilla write your app name here.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(name, () => StorybookUI);

