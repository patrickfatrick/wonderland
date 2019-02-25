import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './ducks/reducer';

const isDebug = process.env.NODE_ENV === 'debug';
const middlewares = [thunk];

const composeEnhancers = isDebug ? composeWithDevTools({}) : compose;

if (isDebug) {
  middlewares.push(createLogger());
}

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(
  reducer,
  /* preloadedState, */
  enhancer,
);
