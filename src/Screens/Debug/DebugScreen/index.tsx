import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import Colors from '../../../Themes/Colors';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import RaisedButton from '../../../Components/Common/RaisedButton';

const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return '[Unserializable object]';
  }
};
//------------------------------------------------------------------------------
const log = [];
const bootTime = new Date();
const oldConsoleLog = console.log;
console.log = (...args) => {
  oldConsoleLog(...args);
  log.push({ logTime: (new Date() - bootTime) / 1000, ...args });
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DebugScreen = ({ navigation }) => (
  <ScrollView
    contentContainerStyle={{
      backgroundColor: Colors.white,
    }}
  >
    <Block>
      <RaisedButton
        variant="default"
        label="Back"
        onPress={() => { navigation.navigate('MainNav'); }}
      />
      <Spacer size="M" />
      {log.map((item, idx) => {
        const { logTime, ...args } = item;
        return [
          // eslint-disable-next-line react/no-array-index-key
          <View key={idx}>
            <Text size="S" selectable>{logTime}</Text>
            {Object.keys(args).map(innerIdx => (
              <Text size="S" key={innerIdx} selectable>
                {safeStringify(args[innerIdx])}
              </Text>
            ))}
          </View>,
          // eslint-disable-next-line react/no-array-index-key
          <Spacer key={`${idx}-spacer`} size="M" />,
        ];
      })}
    </Block>
  </ScrollView>
);

DebugScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DebugScreen;
