import React from 'react';
import { View } from 'react-native';
import { Link } from '@react-navigation/web';
import { SceneView } from '@react-navigation/core';

const WebAppView = ({ descriptors, navigation }) => {
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

export default WebAppView;
