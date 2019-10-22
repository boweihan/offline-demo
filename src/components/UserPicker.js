import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const UserPicker = ({ options, defaultOption, onChange }) => (
  <Dropdown
    options={options}
    value={defaultOption || options[0]}
    onChange={option => onChange(option.value)}
    placeholder="Select User..."
  />
);

UserPicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  defaultOption: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
};

export default UserPicker;
