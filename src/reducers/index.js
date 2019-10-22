import { combineReducers } from 'redux';
import books from './books';
import users from './users';
import checkOuts from './checkOuts';
import ui from './ui';

export default combineReducers({
  books,
  users,
  checkOuts,
  ui
});
