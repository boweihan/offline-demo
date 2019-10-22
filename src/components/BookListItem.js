import React from 'react';
import PropTypes from 'prop-types';
import CheckoutButton from './CheckoutButton';

const styles = {
  listItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    fontFamily: 'Open Sans',
    margin: '2px 0',
  },
};

const BookListItem = ({ checkedOutBy, title, checkout }) => (
  <li className="list_item" style={styles.listItem}>
    {title}
    {checkout && <CheckoutButton onClick={checkout} />}
  </li>
);

BookListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  checkedOutBy: PropTypes.object,
  checkout: PropTypes.func,
};

export default BookListItem;
