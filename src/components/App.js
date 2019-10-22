import React from 'react';
import { Provider } from 'react-redux';
import BookPage from './BookPage';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <BookPage />
  </Provider>
);

export default App;
