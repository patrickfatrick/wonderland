import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './ducks/reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'debug') {
  middlewares.push(createLogger());
}

export default createStore(
  reducer,
  applyMiddleware(...middlewares),
);
