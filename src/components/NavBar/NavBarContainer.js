import { connect } from "react-redux";
import NavBar from "./NavBar";

function mapStateToProps({ data, application }) {
  return {
    info: data.book.info,
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
