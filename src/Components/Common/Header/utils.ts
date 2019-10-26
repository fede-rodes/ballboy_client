export const getTitle = (activeKey: string): string => {
  switch (activeKey) {
    case 'GamesListScreen':
      return 'gamesListScreen.navigation.title';
    case 'GameDetailsScreen':
      return 'gameDetailsScreen.navigation.title';
    case 'GameChatScreen':
      return 'gameChatScreen.navigation.title';
    case 'PlayersListScreen':
      return 'playersListScreen.navigation.title';
    case 'EditGameScreen':
      return 'editGameScreen.navigation.title';
    case 'CancelGameScreen':
      return 'cancelGameScreen.navigation.title';
    case 'SpotsListScreen':
      return 'spotsListScreen.navigation.title';
      // case '':
      //     return '';
    case 'PlanGameScreen':
      return '';
    // case '':
    //   return '';
    case 'ProfileEditScreen':
      return 'profileScreen.navigation.title';
    case 'InfoScreen':
      return 'infoScreen.title';
    default:
      return '';
  }
};

export const getLeftBtn = (): void => {};
