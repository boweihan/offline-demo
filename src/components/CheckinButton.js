import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  button: {
    float: 'right',
    background: 'none',
    backgroundColor: '#ffcccc',
  },
};

const CheckinButton = ({ onClick }) => (
  <button style={styles.button} onClick={onClick}>
    Check In
  </button>
);

CheckinButton.propTypes = {
  onClick: PropTypes.func,
};

export default CheckinButton;
