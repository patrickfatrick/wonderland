import PropTypes from 'prop-types';
import performerShape from './performerShape';

export default PropTypes.shape({
  title: PropTypes.string,
  author: PropTypes.string,
  performers: PropTypes.arrayOf(performerShape),
});
