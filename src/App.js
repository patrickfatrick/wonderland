import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import Reader from "./components/Reader";

function App({
  path,
}) {
  return (
    <Reader path={path} />
  );
}

App.propTypes = {
  path: PropTypes.string.isRequired,
};

export default hot(App);
