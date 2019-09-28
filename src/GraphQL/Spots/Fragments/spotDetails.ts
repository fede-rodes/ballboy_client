import gql from 'graphql-tag';
import spotBaseFragment from './spotBase';

const spotDetailsFragment = gql`
  fragment spotDetailsFragment on Spot {
    ...spotBaseFragment
    address
    location {
      coordinates
    }
  }
  ${spotBaseFragment}
`;

export default spotDetailsFragment;

// import gql from 'graphql-tag';
// import gameFragment from '../../Games/Fragments/game';

// const spotDetailsFragment = gql`
//   fragment spotDetailsFragment on SpotType {
//     uuid
//     name
//     images {
//       uuid
//       image
//     }
//     amenities {
//       uuid
//       #sport {
//       #  uuid
//       #  category
//       #}
//       data
//     }
//     sports {
//       uuid
//       category
//     }
//     address {
//       uuid
//       lat
//       lng
//     }
//     games {
//       ...gameFragment
//     }
//   }
//   ${gameFragment}
// `;

// export default spotDetailsFragment;
