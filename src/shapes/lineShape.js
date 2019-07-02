import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  content: PropTypes.string,
  timestamp: PropTypes.arrayOf(PropTypes.number),
  active: PropTypes.bool,
});
