import { connect } from "react-redux";
import BackMatter from "./BackMatter";

function mapStateToProps({ data }) {
  return {
    backmatter: data.book.backmatter,
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackMatter);
