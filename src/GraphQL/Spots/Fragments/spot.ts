import gql from 'graphql-tag';
import spotBaseFragment from './spotBase';

const spotFragment = gql`
  fragment spotFragment on Spot {
    ...spotBaseFragment
  }
  ${spotBaseFragment}
`;

export default spotFragment;


// import gql from 'graphql-tag';

// const spotFragment = gql`
//   fragment spotFragment on SpotType {
//     uuid
//     name
//     images {
//       uuid
//       image
//     }
//     address {
//       uuid
//       lat
//       lng
//     }
//     sports {
//       uuid
//       category
//     }
//     games {
//       uuid
//       start_time
//       status
//     }
//   }
// `;

// export default spotFragment;
