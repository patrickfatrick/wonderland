import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  timestamp: PropTypes.number,
  active: PropTypes.bool,
  blocks: PropTypes.arrayOf(PropTypes.string),
});
