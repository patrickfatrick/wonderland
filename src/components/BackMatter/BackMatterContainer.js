import { connect } from "react-redux";
import BackMatter from "./BackMatter";

function mapStateToProps(state) {
  return {
    backmatter: state.book.backmatter,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackMatter);
