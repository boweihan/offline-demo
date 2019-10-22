import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  header: {
    backgroundColor: 'darkgray',
  },
  heading: {
    color: 'white',
    fontFamily: 'Open Sans',
    textAlign: 'center',
    margin: 5,
  },
};

const ListHeading = ({ text }) => (
  <div style={styles.header}>
    <h2 style={styles.heading}>{text}</h2>
  </div>
);

ListHeading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ListHeading;
