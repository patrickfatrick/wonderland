import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./ducks/reducer";

const isDevelopment = process.env.NODE_ENV === "development";
const middlewares = [thunk];

if (isDevelopment) {
  middlewares.push(createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));

export default createStore(
  reducer,
  /* preloadedState, */
  enhancer,
);
