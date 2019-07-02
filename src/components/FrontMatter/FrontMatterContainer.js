import { connect } from 'react-redux';
import FrontMatter from './FrontMatter';

function mapStateToProps(state) {
  const { book, application } = state;
  return {
    info: book.info,
    frontmatter: book.frontmatter,
    darkmode: application.darkmode,
    imagesLocation: `${application.assetsLocation}/images/`,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrontMatter);
