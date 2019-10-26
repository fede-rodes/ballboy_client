import React from 'react';
import { Header as BaseHeader } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import Text from '../Text';
import { getTitle, getLeftComponent, getRightComponent } from './utils';

const Header = ({ navigation }) => {
  const activeKey = navigation.state.routes[navigation.state.index].key;

  const title = getTitle(activeKey);
  const LeftComponent = getLeftComponent(activeKey, navigation);
  const RightComponent = getRightComponent(activeKey, navigation);

  if (isEmpty(title)) return null;

  return (
    <BaseHeader
      backgroundColor={Colors.white}
      centerComponent={() => <Text size="ML">{I18n.t(title)}</Text>}
      leftComponent={LeftComponent}
      rightComponent={RightComponent}
    />
  );
};

export default Header;
