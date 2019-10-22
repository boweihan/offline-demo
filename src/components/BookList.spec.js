import React from 'react';
import BookList from './BookList';
import renderer from 'react-test-renderer';

describe('BookList component', () => {
  it('deep snapshot renders correctly', () => {
    const props = {
      heading: 'snapshot',
      books: [
        {
          id: 1,
          title: 'a',
        },
        {
          id: 2,
          title: 'b',
        },
      ],
    };

    const tree = renderer.create(<BookList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
