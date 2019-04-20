import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import Reader from "./components/Reader";

function App({
  bookId,
}) {
  return (
    <Reader bookId={bookId} />
  );
}

App.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default hot(App);
