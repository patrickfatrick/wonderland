import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string,
  content: PropTypes.string,
  timestampStart: PropTypes.number,
  timestampEnd: PropTypes.number,
  active: PropTypes.bool,
});
