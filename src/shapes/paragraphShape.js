import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(['paragraph']),
  lines: PropTypes.arrayOf(PropTypes.string),
});
