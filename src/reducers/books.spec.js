import books from './books';
import { BOOKS_FETCH_SUCCESS } from '../actions';

describe('books reducer', () => {
  it('has correct default state', () => {
    const expectedState = {
      isLoading: true,
      itemsById: {},
      items: [],
    };

    expect(books(undefined, {})).toEqual(expectedState);
  });

  it('returns correct state on fetch success', () => {
    const mockAction = {
      type: BOOKS_FETCH_SUCCESS,
      payload: [{ id: 1, title: 'test' }, { id: 2, title: 'me' }],
    };

    const expectedState = {
      isLoading: false,
      itemsById: {
        1: {
          id: 1,
          title: 'test',
        },
        2: {
          id: 2,
          title: 'me',
        },
      },
      items: [1, 2],
    };

    expect(books(undefined, mockAction)).toEqual(expectedState);
  });
});
