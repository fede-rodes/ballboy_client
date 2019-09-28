import React from 'react';
import PropTypes from 'prop-types';
import { CITIES } from '../../../constants';
import cityPropTypes from '../../../propTypesDefinitions/city';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const data = CITIES.map(({ id, city }) => ({ label: city, value: id }));
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LocationPickerField = ({ value, onChange, ...rest }) => {
  const item = value ? data.find(d => (d.value === value.id)) : null;
  const nCities = CITIES.length;

  return (
    <InputField
      comp="Dropdown"
      value={item ? item.label : ''}
      data={data}
      onChangeText={(d) => {
        const location = CITIES.find(c => (c.id === d.value));
        onChange(location);
      }}
      dropdownPosition={-nCities}
      itemCount={nCities}
      {...rest}
    />
  );
};

LocationPickerField.propTypes = {
  value: cityPropTypes,
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

LocationPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default LocationPickerField;
