import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from './public/store/reducers'
import App from './public/App.jsx'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger()
  middlewares.push(logger)
}

let store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
