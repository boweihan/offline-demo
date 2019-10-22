import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from "redux-api-middleware";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(apiMiddleware, thunk)),
);
