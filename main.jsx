/* globals document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './src/store/reducers';
import App from './src/App';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'debug') {
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

// `path` prop would probably be passed in from the server or URL
render(
  <Provider store={store}>
    <App path="data/26tniea82c/" />
  </Provider>,
  document.getElementById('app'),
);
