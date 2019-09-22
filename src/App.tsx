import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SPORTS,
  ACTIVITY_STATUSES,
  ATTENDEE_ACTIONS,
  CITIES,
} from './constants';

const App = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app! HELLOOOOO TIOT</Text>
    <Text>{JSON.stringify(SPORTS)}</Text>
    <Text>{JSON.stringify(ACTIVITY_STATUSES)}</Text>
    <Text>{JSON.stringify(ATTENDEE_ACTIONS)}</Text>
    <Text>{JSON.stringify(CITIES)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
