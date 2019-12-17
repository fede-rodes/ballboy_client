import PropTypes from 'prop-types';
import React from 'react';
import { propType } from 'graphql-anywhere';
import { View, FlatList, ScrollView } from 'react-native';
import { useQuery } from 'react-apollo';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import cityFragment from '../../../GraphQL/Cities/Fragments/city';
import citiesQuery from '../../../GraphQL/Cities/Queries/cities';
import Images from '../../../Themes/Images';
import ImageBackground from '../../../Backgrounds/ImageBackground';
import Text from '../../Common/Text';
import Block from '../../Common/Block';
import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';
import CenteredActivityIndicator from '../../Common/CenteredActivityIndicator';


//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  city: null,
};

export const getInitState = () => cloneDeep(INIT_STATE);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CitySlide = ({ city, onChange }) => {
  const { loading, error, data } = useQuery(citiesQuery);

  if (loading) {
    return <CenteredActivityIndicator />;
  }
  if (error || !data || !data.cities) {
    return null;
  }

  const { cities } = data;
  console.log({ cities });

  return (
    <ImageBackground image={Images.locationOnboarding}>
      <View>
        <Text size="M" color="white" center>
          {I18n.t('locationSlide.title')}
        </Text>
      </View>
      <Spacer size="L" />
      <ScrollView>
        <Block style={{ flex: 1 }}>
          <FlatList
            data={cities}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RaisedButton
                label={item.name}
                variant={city && city._id && city._id === item._id ? 'default' : 'transparent'}
                onPress={() => { onChange({ fieldName: 'city', value: item }); }}
              />
            )}
            ItemSeparatorComponent={() => (<Spacer size="XL" />)}
            contentContainerStyle={{ flex: 1 }}
          />
        </Block>
      </ScrollView>
    </ImageBackground>
  );
};

CitySlide.requiredFields = ['city'];

CitySlide.propTypes = {
  city: propType(cityFragment),
  onChange: PropTypes.func,
};

CitySlide.defaultProps = {
  city: getInitState(),
  onChange: () => {},
};

export default CitySlide;


// import PropTypes from 'prop-types';
// import React from 'react';
// import { View, FlatList, ScrollView } from 'react-native';
// import cloneDeep from 'lodash/cloneDeep';
// import I18n from '../../../I18n';
// import { CITIES } from '../../../constants';
// import cityPropTypes from '../../../propTypesDefinitions/city';
// import Images from '../../../Themes/Images';
// import ImageBackground from '../../../Backgrounds/ImageBackground';
// import Text from '../../Common/Text';
// import Block from '../../Common/Block';
// import Spacer from '../../Common/Spacer';
// import RaisedButton from '../../Common/RaisedButton';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// export const INIT_STATE = {
//   location: null,
// };

// export const getInitState = () => cloneDeep(INIT_STATE);
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const LocationSlide = ({ location, onChange }) => (
//   <ImageBackground image={Images.locationOnboarding}>
//     <View>
//       <Text size="M" color="white" center>
//         {I18n.t('locationSlide.title')}
//       </Text>
//     </View>
//     <Spacer size="L" />
//     <ScrollView>
//       <Block style={{ flex: 1 }}>
//         <FlatList
//           keyExtractor={item => item.id}
//           data={CITIES}
//           renderItem={({ item }) => (
//             <RaisedButton
//               label={item.city}
//               variant={location && location.id && location.id === item.id ? 'default' : 'transparent'}
//               onPress={() => { onChange({ fieldName: 'location', value: item }); }}
//             />
//           )}
//           ItemSeparatorComponent={() => (<Spacer size="XL" />)}
//           contentContainerStyle={{ flex: 1 }}
//         />
//       </Block>
//     </ScrollView>
//   </ImageBackground>
// );

// LocationSlide.requiredFields = ['location'];

// LocationSlide.propTypes = {
//   location: cityPropTypes,
//   onChange: PropTypes.func,
// };

// LocationSlide.defaultProps = {
//   location: getInitState(),
//   onChange: () => {},
// };

// export default LocationSlide;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { View, FlatList, ScrollView } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import cloneDeep from 'lodash/cloneDeep';
// import get from 'lodash/get';
// import I18n from '../../../I18n';
// import config from '../../../config';
// // import { CITIES } from '../../../constants';
// import Images from '../../../Themes/Images';
// import ImageBackground from '../../../Backgrounds/ImageBackground';
// import Text from '../../Common/Text';
// import Block from '../../Common/Block';
// import Spacer from '../../Common/Spacer';
// // import RaisedButton from '../../Common/RaisedButton';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// export const INIT_STATE = {
//   location: null,
// };

// export const getInitState = () => cloneDeep(INIT_STATE);
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class LocationSlide extends React.PureComponent {
//   handleChange = (details) => {
//     const { onChange } = this.props;

//     const {
//       address_components: addressComponents,
//       formatted_address: formattedAddress,
//       geometry: {
//         location: {
//           lat,
//           lng,
//         },
//       },
//     } = details;

//     const cityComponent = addressComponents.find(c => (c.types.includes('locality')));
//     const countryComponent = addressComponents.find(c => (c.types.includes('country')));

//     console.log(
//       'cityComponent', cityComponent,
//       'countryComponent', countryComponent,
//     );

//     const location = {
//       city: get(cityComponent, 'long_name', ''),
//       country: get(countryComponent, 'long_name', ''),
//       formattedAddress,
//       coordinates: [lat, lng],
//     };

//     // Pass event up to parent component
//     onChange({ fieldName: 'location', value: location });
//   }

//   render() {
//     return (
//       <ImageBackground /* image={Images.locationOnboarding} */>
//         <KeyboardAwareScrollView
//           extraHeight={70}
//           enableOnAndroid
//           keyboardShouldPersistTaps="handled"
//         >
//             <View>
//               <Text size="M" color="white" center>
//                 {I18n.t('locationSlide.title')}
//               </Text>
//             </View>
//             <Spacer size="L" />
//             <Block style={{ flex: 1 }}>
//               <GooglePlacesAutocomplete
//                 placeholder="Enter address, post code, neighbour or city"
//                 minLength={2} // minimum length of text to search
//                 autoFocus={false}
//                 // returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//                 // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
//                 listViewDisplayed="auto" // true/false/undefined
//                 fetchDetails
//                 // renderDescription={row => row.description} // custom description render
//                 onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//                   console.log(
//                     // 'data', data,
//                     'details', details, // formatted_address, geometry: { location: { lat, lng } }
//                   );
//                   this.handleChange(details);
//                 }}

//                 getDefaultValue={() => ''}

//                 query={{
//                   // available options: https://developers.google.com/places/web-service/autocomplete
//                   key: config.googlePlacesApiKey,
//                   language: 'en', // language of the results
//                   types: '(cities)', // default: 'geocode'
//                 }}

//                 styles={{
//                   textInputContainer: {
//                     width: '100%',
//                   },
//                   description: {
//                     fontWeight: 'bold',
//                   },
//                   predefinedPlacesDescription: {
//                     color: '#1faadb',
//                   }
//                 }}

//                 currentLocation // Will add a 'Current location' button at the top of the predefined places list
//                 currentLocationLabel="Use my current location"
//                 // nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//                 // GoogleReverseGeocodingQuery={{
//                 //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//                 // }}
//                 // GooglePlacesSearchQuery={{
//                 //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//                 //   rankby: 'distance',
//                 //   type: 'cafe'
//                 // }}

//                 GooglePlacesDetailsQuery={{
//                   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
//                   fields: 'formatted_address',
//                 }}

//                 // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//                 // predefinedPlaces={[homePlace, workPlace]}

//                 debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//                 // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
//                 // renderRightButton={() => <Text>Custom text after the input</Text>}
//               />
//               {/* <FlatList
//                 keyExtractor={item => item.id}
//                 data={CITIES}
//                 renderItem={({ item: city }) => (
//                   <RaisedButton
//                     label={city.name}
//                     variant={location && location.id && location.id === city.id ? 'default' : 'transparent'}
//                     onPress={() => { onChange({ fieldName: 'location', value: city }); }}
//                   />
//                 )}
//                 ItemSeparatorComponent={() => (<Spacer size="XL" />)}
//                 contentContainerStyle={{ flex: 1 }}
//               /> */}
//             </Block>
//         </KeyboardAwareScrollView>
//       </ImageBackground>
//     );
//   }
// }

// LocationSlide.requiredFields = ['location'];

// LocationSlide.propTypes = {
//   location: PropTypes.shape({
//     formattedAddress: PropTypes.string,
//     city: PropTypes.string,
//     country: PropTypes.string,
//     coordinates: PropTypes.arrayOf(PropTypes.number),
//   }),
//   onChange: PropTypes.func,
// };

// LocationSlide.defaultProps = {
//   location: getInitState(),
//   onChange: () => {},
// };

// export default LocationSlide;
