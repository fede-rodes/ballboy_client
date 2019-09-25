import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import get from 'lodash/get';
import styled from 'styled-components/native';
// import { locationPropTypes, withLocation } from '../../../Context/Location';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import GamesList from '../../../Components/Games/GamesList';
import NoGamesFound from '../../../Components/Games/NoGamesFound';
// import curatedGames from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const LIMIT = 10;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GamesListScreen extends React.Component {
  handleGamePress = (activity) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetailsScreen', { _id: activity._id });
  }

  render() {
    return (
      <QueryCatchErrors
        query={activitiesQuery}
        variables={{ offset: 0, limit: LIMIT }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data, refetch, fetchMore }) => {
          const loadMore = () => {
            fetchMore({
              variables: {
                offset: get(data, 'activities.length', 0),
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  activities: [...prev.activities, ...fetchMoreResult.activities],
                });
              },
            });
          };

          const { activities = [] } = data;

          return (
            <Container testID="GameListScreen">
              <GamesList
                activities={activities}
                onCardPress={this.handleGamePress}
                nothingFoundComp={NoGamesFound}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading}
                onEndReached={activities.length < LIMIT ? () => null : loadMore}
                onEndReachedThreshold={0.1}
              />
            </Container>
          );
        }}
      </QueryCatchErrors>
    );
  }
}

GamesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamesListScreen;
