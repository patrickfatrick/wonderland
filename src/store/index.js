import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./ducks/reducer";

const isQuiet = process.env.QUIET === "true";
const middlewares = [thunk];

if (!isQuiet) {
  middlewares.push(createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));

export default createStore(
  reducer,
  /* preloadedState, */
  enhancer,
);
