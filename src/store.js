import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import SnackBar from './SnackBar';

const getErrorMessage = error => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.description) {
    return error.description;
  }
  if (error.message) {
    return error.message;
  }
  if (error.statusText) {
    return error.statusText;
  }
  return 'An error occured.';
};

const errorMiddleware = () => {
  return (store: Object) => {
    return (next: Function) => {
      return async (action: Object) => {
        try {
          return await next(action);
        } catch (err) {
          SnackBar.error(getErrorMessage(err));
          return err;
        }
      };
    };
  };
};

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(errorMiddleware(), apiMiddleware, thunk)),
);
