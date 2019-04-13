import PropTypes from "prop-types";
import headingShape from "./headingShape";
import paragraphShape from "./paragraphShape";
import imageShape from "./imageShape";
import flourishShape from "./flourishShape";
import fixedShape from "./fixedShape";

export default PropTypes.oneOfType([
  headingShape,
  paragraphShape,
  imageShape,
  flourishShape,
  fixedShape,
]);
