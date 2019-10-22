import React from 'react';
import PropTypes from 'prop-types';
import BookListItem from './BookListItem';
import ListHeading from './ListHeading';

const style = {
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
};

const BookList = ({ heading, books, selectedUser, checkOut, checkIn }) => (
  <div style={style.container}>
    <ListHeading text={heading} />
    <ul style={style.list}>
      {books.map(book => {
        return (
          <BookListItem
            key={book.id}
            {...book}
            checkOut={checkOut && (() => checkOut(book, selectedUser))}
            checkIn={checkIn && (() => checkIn(book.checkOutId))}
          />
        );
      })}
    </ul>
  </div>
);

BookList.propTypes = {
  heading: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      checkedOutBy: PropTypes.obj,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  checkOut: PropTypes.func,
  checkIn: PropTypes.func,
};

export default BookList;
