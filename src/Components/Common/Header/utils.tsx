import React from 'react';
import StackBackHeader from '../../../Navigation/StackBackHeader';
import UserMenu from '../../Profile/UserMenu';
import AdminMenu from '../../Games/AdminMenu';
import HeaderBtn from '../HeaderBtn';

const BackBtn = () => (
  <StackBackHeader onPress={() => { window.history.back(); }} />
);

const ROUTES = {
  SignupEmailScreen: {
    title: 'signupEmailScreen.navigation.title',
    leftComponent: BackBtn,
  },
  LoginScreen: {
    title: 'loginScreen.navigation.title',
    leftComponent: BackBtn,
  },
  CheckEmailScreen: {
    title: 'checkEmailScreen.navigation.title',
  },
  GamesListScreen: {
    title: 'gamesListScreen.navigation.title',
  },
  GameDetailsScreen: {
    title: 'gameDetailsScreen.navigation.title',
    leftComponent: BackBtn,
    rightComponent: ({ navigation, params }) => (
      <AdminMenu navigation={navigation} activityId={params._id} />
    ),
    // leftComponent: () => <BackBtn />,
    // leftComponent: ({ navigation }) => (
    //   <HeaderBtn
    //     iconSet="MaterialIcons"
    //     iconName="arrow-back"
    //     size={24}
    //     // onPress={() => { navigation.navigate('GamesListScreen'); }}
    //     onPress={() => { window.history.back(); }}
    //   />
    // ),
  },
  GameChatScreen: {
    title: 'gameChatScreen.navigation.title',
    leftComponent: BackBtn,
  },
  PlayersListScreen: {
    title: 'playersListScreen.navigation.title',
    leftComponent: BackBtn,
    // leftComponent: ({ params, navigation }) => (
    //   <HeaderBtn
    //     iconSet="MaterialIcons"
    //     iconName="arrow-back"
    //     size={24}
    //     onPress={() => { navigation.navigate('GameDetailsScreen', params); }}
    //   />
    // ),
  },
  EditGameScreen: {
    title: 'editGameScreen.navigation.title',
    leftComponent: BackBtn,
  },
  CancelGameScreen: {
    title: 'cancelGameScreen.navigation.title',
    leftComponent: BackBtn,
  },
  SpotsListScreen: {
    title: 'spotsListScreen.navigation.title',
    rightComponent: ({ navigation }) => (
      <HeaderBtn
        iconName="filter-list"
        onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
      />
    ),
  },
  SpotDetailsScreen: {
    title: 'spotDetailsScreen.navigation.title',
    leftComponent: BackBtn,
    // leftComponent: ({ navigation }) => (
    //   <HeaderBtn
    //     iconSet="MaterialIcons"
    //     iconName="arrow-back"
    //     size={24}
    //     onPress={() => { navigation.navigate('SpotsListScreen'); }}
    //   />
    // ),
  },
  SpotsFilterScreen: {
    title: 'spotsFilterScreen.navigation.title',
    // leftComponent: BackBtn,
    rightComponent: () => (
      <HeaderBtn
        iconName="close"
        onPress={() => { window.history.back(); }}
      />
    ),
  },
  PlanGameScreen: {
    title: '',
  },
  ProfileEditScreen: {
    title: 'profileScreen.navigation.title',
    rightComponent: ({ navigation }) => (
      <UserMenu navigation={navigation} />
    ),
  },
  InfoScreen: {
    title: 'infoScreen.title',
  },
};

export const getTitle = ({ activeKey }): string => (
  ROUTES[activeKey] ? ROUTES[activeKey].title : ''
);

export const getLeftComponent = ({ activeKey, params, navigation }) => (
  ROUTES[activeKey] && ROUTES[activeKey].leftComponent
    ? ROUTES[activeKey].leftComponent({ navigation, params })
    : null
);

export const getRightComponent = ({ activeKey, params, navigation }) => (
  ROUTES[activeKey] && ROUTES[activeKey].rightComponent
    ? ROUTES[activeKey].rightComponent({ navigation, params })
    : null
);
