import React from 'react';
import { Header as BaseHeader } from 'react-native-elements';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import Text from '../Text';
import { getTitle } from './utils';

const Header = ({ navigation }) => {
  const activeKey = navigation.state.routes[navigation.state.index].key;

  const title = getTitle(activeKey);

  return (
    <BaseHeader
      backgroundColor={Colors.white}
      centerComponent={() => <Text size="ML">{I18n.t(title)}</Text>}
    />
  );
};

export default Header;
