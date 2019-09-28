import gql from 'graphql-tag';

const spotBaseFragment = gql`
  fragment spotBaseFragment on Spot {
    _id
    spotname
    images
    sports
    distance
  }
`;

export default spotBaseFragment;


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
