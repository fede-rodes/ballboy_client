import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { useQuery } from 'react-apollo';
import cityFragment from '../../../GraphQL/Cities/Fragments/city';
import citiesQuery from '../../../GraphQL/Cities/Queries/cities';
import CenteredActivityIndicator from '../CenteredActivityIndicator';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CityPickerField = ({ value, onChange, ...rest }) => {
  const { loading, error, data } = useQuery(citiesQuery);

  if (loading) {
    return <CenteredActivityIndicator />;
  }
  if (error || !data || !data.cities) {
    return null;
  }

  const { cities } = data;
  console.log({ cities });

  const items = cities.map(({ _id, name }) => ({ label: name, value: _id }));

  const selected = value ? items.find((i) => (i.value === value._id)) : null;
  const nCities = cities.length;

  return (
    <InputField
      comp="Dropdown"
      value={selected ? selected.label : ''}
      data={data}
      onChangeText={(d) => {
        const location = cities.find((c) => (c._id === d.value));
        onChange(location);
      }}
      dropdownPosition={-nCities}
      itemCount={nCities}
      {...rest}
    />
  );
};

CityPickerField.propTypes = {
  value: propType(cityFragment),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

CityPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default CityPickerField;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { useQuery } from 'react-apollo';
// import cityPropTypes from '../../../propTypesDefinitions/city';
// import InputField from '../InputField';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const data = CITIES.map(({ id, city }) => ({ label: city, value: id }));
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const LocationPickerField = ({ value, onChange, ...rest }) => {
//   const { loading, error, data } = useQuery(GET_GREETING, {
//     variables: { language: 'english' },
//   });
//   if (loading) return <p>Loading ...</p>;
//   return <h1>Hello {data.greeting.message}!</h1>;
//   const item = value ? data.find((d) => (d.value === value.id)) : null;
//   const nCities = CITIES.length;

//   return (
//     <InputField
//       comp="Dropdown"
//       value={item ? item.label : ''}
//       data={data}
//       onChangeText={(d) => {
//         const location = CITIES.find((c) => (c.id === d.value));
//         onChange(location);
//       }}
//       dropdownPosition={-nCities}
//       itemCount={nCities}
//       {...rest}
//     />
//   );
// };

// LocationPickerField.propTypes = {
//   value: cityPropTypes,
//   onChange: PropTypes.func,
//   // Plus all InputField props (theme, size)
// };

// LocationPickerField.defaultProps = {
//   value: null,
//   onChange: () => {},
// };

// export default LocationPickerField;
