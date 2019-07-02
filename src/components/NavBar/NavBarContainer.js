import { connect } from 'react-redux';
import NavBar from './NavBar';

function mapStateToProps(state) {
  const { book, application } = state;
  return {
    info: book.info,
    darkmode: application.darkmode,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
