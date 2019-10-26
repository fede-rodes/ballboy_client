import React from 'react';
import StackBackHeader from '../../../Navigation/StackBackHeader';
import HeaderBtn from '../HeaderBtn';

const BackBtn = () => (
  <StackBackHeader onPress={window.history.back} />
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
  },
  GameChatScreen: {
    title: 'gameChatScreen.navigation.title',
    leftComponent: BackBtn,
  },
  PlayersListScreen: {
    title: 'playersListScreen.navigation.title',
    leftComponent: BackBtn,
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
    rightComponent: () => (
      <HeaderBtn
        iconName="filter-list"
        onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
      />
    ),
  },
  SpotDetailsScreen: {
    title: 'spotDetailsScreen.navigation.title',
    leftComponent: BackBtn,
  },
  SpotsFilterScreen: {
    title: 'spotsFilterScreen.navigation.title',
    leftComponent: BackBtn,
    rightComponent: () => (
      <HeaderBtn
        iconName="close"
        onPress={window.history.back}
      />
    ),
  },
  PlanGameScreen: {
    title: '',
  },
  ProfileEditScreen: {
    title: 'profileScreen.navigation.title',
  },
  InfoScreen: {
    title: 'infoScreen.title',
  },
};

export const getTitle = (activeKey: string): string => (
  ROUTES[activeKey] ? ROUTES[activeKey].title : ''
);

export const getLeftComponent = (activeKey: string, navigation) => (
  ROUTES[activeKey] ? ROUTES[activeKey].leftComponent : null
);

export const getRightComponent = (activeKey: string, navigation) => (
  ROUTES[activeKey] ? ROUTES[activeKey].rightComponent : null
);
