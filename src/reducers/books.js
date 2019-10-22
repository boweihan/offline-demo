import { BOOKS_FETCH_SUCCESS } from '../actions';

import { getCurrentCheckOuts } from './checkOuts';

const normalizeBookList = bookList => {
  const byId = {};
  const idList = [];

  bookList.forEach(book => {
    byId[book.id] = { ...book };
    idList.push(book.id)
  });

  return {
    itemsById: byId,
    items: idList,
  };
};

const books = (
  state = {
    isLoading: true,
    itemsById: {},
    items: [],
  },
  action,
) => {
  switch (action.type) {
    case BOOKS_FETCH_SUCCESS:
      return {
        isLoading: false,
        // Normalizing your state is an absolutely critical component of a good
        // redux store. Just like a database, there should be no repetition
        // in data. Here, because of the selectors that filter by check outs,
        // I need to be able to grab a book by id without iterating through
        // the entire list. There are much more robust ways to normalize an
        // entity's state based on API response. This is the quick and dirty
        // way :) It will only work if we never re-fetch data.
        ...normalizeBookList(action.payload),
      };
    default:
      return state;
  }
};

const getBookById = (state, bookId) => state.books.itemsById[bookId];

// selectors
export const getAvailableBooks = state => {
  const booksById = { ...state.books.itemsById };
  getCurrentCheckOuts(state).forEach(
    checkOut => delete booksById[checkOut.bookId],
  );
  return Object.keys(booksById).map(id => getBookById(state, id));
};

export const getBooksCheckedOutByCurrentUser = state => {
  return getCurrentCheckOuts(state)
    .filter(checkOut => checkOut.userId === state.ui.selectedUserId)
    .map(checkOut => getBookById(state, checkOut.bookId));
};

export const getBooksCheckedOutByOtherUsers = state => {
  return getCurrentCheckOuts(state)
    .filter(checkOut => checkOut.userId !== state.ui.selectedUserId)
    .map(checkOut => getBookById(state, checkOut.bookId));
};

export default books;
