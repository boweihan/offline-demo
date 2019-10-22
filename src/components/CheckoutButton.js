import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  button: {
    float: 'right',
    background: 'none',
    backgroundColor: '#ccffcc',
  },
};

const CheckoutButton = ({ onClick }) => (
  <button style={styles.button} onClick={onClick}>
    Check Out
  </button>
);

CheckoutButton.propTypes = {
  onClick: PropTypes.func,
};

export default CheckoutButton;
