import React from 'react';
import PropTypes from 'prop-types';
import CheckoutButton from './CheckoutButton';
import CheckinButton from './CheckinButton';

const styles = {
  listItem: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    fontFamily: 'Open Sans',
    margin: '2px 0',
  },
};

const BookListItem = ({ checkedOutBy, title, checkOut, checkIn }) => (
  <li className="list_item" style={styles.listItem}>
    {title}
    {checkOut && <CheckoutButton onClick={checkOut} />}
    {checkIn && <CheckinButton onClick={checkIn} />}
  </li>
);

BookListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  checkedOutBy: PropTypes.object,
  checkOut: PropTypes.func,
  checkIn: PropTypes.func,
};

export default BookListItem;
