import { connect } from 'react-redux';
import FrontMatter from './FrontMatter';

function mapStateToProps({ data, application }) {
  return {
    info: data.book.info,
    frontmatter: data.book.frontmatter,
    imagesLocation: `${application.assetsLocation}images/`,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontMatter);
