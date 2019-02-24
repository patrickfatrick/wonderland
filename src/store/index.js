import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './ducks/reducer';

const middlewares = [thunk];

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV === 'debug' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/* eslint-enable no-underscore-dangle */

if (process.env.NODE_ENV === 'debug') {
  middlewares.push(createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(
  reducer, /* preloadedState, */
  enhancer,
);
