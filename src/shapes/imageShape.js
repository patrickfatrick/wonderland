import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.oneOf(['image']),
  src: PropTypes.string,
  thumb: PropTypes.string,
});
