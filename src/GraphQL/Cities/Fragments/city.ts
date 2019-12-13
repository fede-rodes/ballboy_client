import gql from 'graphql-tag';

const cityFragment = gql`
  fragment cityFragment on City {
    _id
    cityname
    country
    formattedAddress
    location {
      coordinates
    }
  }
`;

export default cityFragment;
