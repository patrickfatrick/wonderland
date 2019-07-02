import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  chapterId: PropTypes.string,
  type: PropTypes.oneOf(['heading']),
  title: PropTypes.string,
});
