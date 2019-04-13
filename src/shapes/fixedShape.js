import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(["fixed"]),
  content: PropTypes.string,
  lines: PropTypes.arrayOf(PropTypes.string),
});
